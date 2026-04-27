using AuthModule.Application.DTOs;
using AuthModule.Domain.Enums;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.UpdateEmployeeDetailsCommand
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
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == command.dto.Email, cancellationToken);

            if (user is null)
                throw new Exception("Kullanıcı bulunamadı.");

            user.UpdateDepartment(command.dto.DepartmentId);
           

            if (Enum.TryParse<IsActiveEnum>(command.dto.IsActive, true, out var isActiveResult))
            {
                user.UpdateStatus(isActiveResult);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
    

}
