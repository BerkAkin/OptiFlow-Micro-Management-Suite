using AuthModule.Data;
using AuthModule.DTO;
using AuthModule.Enums;
using AuthModule.Models;
using MediatR;

namespace AuthModule.Services
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
            var user = _context.Users.Where(x=>x.Email==command.dto.Email).FirstOrDefault();
            if (user is not null)
                throw new Exception("Email already registered");

            User newEmployee = new User()
            {
                Name = command.dto.Name,
                Surname = command.dto.Surname,
                Email = command.dto.Email,
                PhoneNum = command.dto.PhoneNum,
                BirthDate = command.dto.BirthDate,
                Street = command.dto.Street,
                Street2 = command.dto.Street2,
                ApartmentNum=command.dto.ApartmentNum,
                DoorNumber=command.dto.DoorNumber,
                Province=command.dto.Province,
                District=command.dto.District,
                FullAddress=command.dto.FullAddress,
                DepartmentId =command.dto.DepartmentId,
                Company= command.currentCompany,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123"),
                TenantId= command.currentTenant,
                IsActive = IsActiveEnum.Active,
                 
            };

            await _context.Users.AddAsync(newEmployee);
            await _context.SaveChangesAsync();
            
            return Unit.Value;
        }
    }
}
