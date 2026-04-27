using AuthModule.Application.DTOs;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.AddNewEmployeeCommand
{
    public record AddNewEmployeeCommand(AddNewEmployeeDto dto, int currentTenant,string currentCompany):IRequest<Unit>;
    public class AddNewEmployeeCommandHandler : IRequestHandler<AddNewEmployeeCommand,Unit>
    {
        private readonly AuthDBContext _context;
        public AddNewEmployeeCommandHandler(AuthDBContext context) {
            _context = context;
        }

        public async Task<Unit> Handle(AddNewEmployeeCommand command, CancellationToken cancellationToken)
        {

            var tenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == command.currentTenant, cancellationToken);

            if (tenant is null)
                throw new Exception("Company does not exist");

            tenant.AddUser(
                command.dto.Firstname,command.dto.Lastname,command.dto.Email,BCrypt.Net.BCrypt.HashPassword("123"),
                command.dto.PhoneNum,command.dto.BirthDate,command.dto.Street,command.dto.Street2,
                command.dto.ApartmentNum,command.dto.DoorNumber,command.dto.Province,command.dto.District,
                command.dto.FullAddress,1
            );
            
            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}
