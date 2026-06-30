using AuthModule.Application.DTOs;
using AuthModule.Application.Services;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Enums;

namespace AuthModule.Application.Commands.UpdateEmployeeDetailsCommand
{
    public record UpdateEmployeeCommand(UpdateEmployeeDetailsDto dto) : IRequest<Unit>;
    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, Unit>
    {
        private readonly AuthDBContext _context;
        private readonly UserUpdatedEventPublisher _publisher;
        public UpdateEmployeeCommandHandler(AuthDBContext context, UserUpdatedEventPublisher publisher)
        {
            _context = context;
            _publisher = publisher;
        }

        public async Task<Unit> Handle(UpdateEmployeeCommand command, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(x => x.Email == command.dto.Email, cancellationToken);

            if (user is null)
                throw new Exception("Kullanıcı bulunamadı.");

            user.UpdateDepartment(command.dto.DepartmentId);
            if (Enum.TryParse<IsActiveEnum>(command.dto.IsActive, out var isActiveResult))
            {
                user.UpdateStatus(isActiveResult);
            }

            await _context.SaveChangesAsync(cancellationToken);

            await _publisher.PublishEvents(user);

            return Unit.Value;
        }
    }


}
