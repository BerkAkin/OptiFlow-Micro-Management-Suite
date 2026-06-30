using AuthModule.Application.DTOs;
using AuthModule.Application.Services;
using AuthModule.Domain.Entities;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.AddNewEmployeeCommand
{
    public record AddNewEmployeeCommand(AddNewEmployeeDto dto, int currentTenant, string currentCompany) : IRequest<Unit>;
    public class AddNewEmployeeCommandHandler : IRequestHandler<AddNewEmployeeCommand, Unit>
    {
        private readonly AuthDBContext _context;
        private readonly UserCreatedEventPublisher _eventPublisher;
        public AddNewEmployeeCommandHandler(AuthDBContext context, UserCreatedEventPublisher eventPublisherService)
        {
            _context = context;
            _eventPublisher = eventPublisherService;
        }

        public async Task<Unit> Handle(AddNewEmployeeCommand command, CancellationToken cancellationToken)
        {

            var tenant = await _context.Tenants
                .Include(t => t.TenantModules)
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(t => t.Id == command.currentTenant, cancellationToken);

            if (tenant is null)
                throw new Exception("Company does not exist");

            List<int> tenantModules = tenant.TenantModules.Select(x => x.ModuleId).ToList();

            User newuser = tenant.AddUser(
                command.dto.Firstname, command.dto.Lastname, command.dto.Email, BCrypt.Net.BCrypt.HashPassword("123"),
                command.dto.PhoneNum, command.dto.BirthDate, command.dto.Street, command.dto.Street2,
                command.dto.ApartmentNum, command.dto.DoorNumber, command.dto.Province, command.dto.District,
                command.dto.FullAddress, command.dto.DepartmentId
            );

            await _context.SaveChangesAsync(cancellationToken);

            await _eventPublisher.PublishEvents(tenant, newuser, tenantModules);
            return Unit.Value;
        }
    }
}
