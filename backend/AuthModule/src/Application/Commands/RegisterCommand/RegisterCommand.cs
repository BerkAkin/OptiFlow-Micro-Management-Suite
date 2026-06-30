using AuthModule.Application.DTOs;
using AuthModule.Application.Services;
using AuthModule.Domain.Entities;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.RegisterCommand
{
    public record RegisterCommand(RegisterDTO dto) : IRequest<Unit>;
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Unit>
    {
        private readonly AuthDBContext _context;
        private readonly UserCreatedEventPublisher _eventPublisher;

        public RegisterCommandHandler(AuthDBContext context, UserCreatedEventPublisher eventPublisher)
        {
            _context = context;
            _eventPublisher = eventPublisher;
        }

        public async Task<Unit> Handle(RegisterCommand command, CancellationToken cancellationToken)
        {
            var userExists = await _context.Users
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(u => u.Email == command.dto.Email);
            if (userExists is not null)
                throw new Exception("Email already registered");

            var tenantExists = await _context.Tenants.FirstOrDefaultAsync(t => t.Name == command.dto.TenantName);

            if (tenantExists is not null)
                throw new Exception("Company already exists");


            Tenant newTenant = new Tenant(
                                    command.dto.TenantName, command.dto.TenantAddress, command.dto.TenantPhoneNum,
                                    command.dto.TenantFaxNum, command.dto.TenantEmail, command.dto.TenantTaxOffice,
                                    command.dto.TenantTaxNumber, command.dto.TenantMersisNum, command.dto.TenantTradeRegistryNum
                                    );


            foreach (int moduleId in command.dto.SelectedModuleIds)
                newTenant.AssignModule(Convert.ToInt32(moduleId));



            newTenant.AddUser(
                                command.dto.Firstname, command.dto.Lastname, command.dto.Email,
                                BCrypt.Net.BCrypt.HashPassword(command.dto.Password), command.dto.PhoneNum,
                                command.dto.BirthDate, command.dto.Street, command.dto.Street2,
                                command.dto.ApartmentNum, command.dto.DoorNumber, command.dto.Province,
                                command.dto.District, command.dto.FullAddress, 4
                                );

            await _context.Tenants.AddAsync(newTenant);
            await _context.SaveChangesAsync(cancellationToken);


            var createdUser = newTenant.Users.First();

            await _eventPublisher.PublishEvents(newTenant, createdUser, command.dto.SelectedModuleIds);

            return Unit.Value;
        }
    }
}
