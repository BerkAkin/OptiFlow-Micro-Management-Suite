using AuthModule.Data;
using AuthModule.DTO;
using AuthModule.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Services
{
        public record UpdateEmployeeCommand(UpdateEmployeeDetailsDto dto) : IRequest<Unit>;
        public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, Unit>
        {
            private readonly AuthDBContext _context;
            public UpdateEmployeeCommandHandler(AuthDBContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateEmployeeCommand command, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Where(x => x.Email == command.dto.Email).FirstOrDefaultAsync();
                if (user is  null)
                    throw new Exception("User Doesn't Exist");

                if (int.TryParse(command.dto.Department, out int deptId))
                {
                    user.DepartmentId = deptId;
                }

                if (Enum.TryParse<IsActiveEnum>(command.dto.IsActive, true, out var isActiveResult))
                {
                    user.IsActive = isActiveResult;
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    

}
