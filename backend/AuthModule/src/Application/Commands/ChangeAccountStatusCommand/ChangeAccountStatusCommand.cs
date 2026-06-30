using AuthModule.Application.DTOs;
using AuthModule.Application.Services;
using AuthModule.Domain.Entities;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Enums;

namespace AuthModule.Application.Commands.ChangeAccountStatusCommand
{
    public record ChangeAccountStatusCommand(int tenantId, int userId, AccountDeactivateDto dto) : IRequest<Unit>;
    public class ChangeAccountStatusCommandHandler : IRequestHandler<ChangeAccountStatusCommand, Unit>
    {
        private readonly AuthDBContext _context;
        private readonly UserUpdatedEventPublisher _eventPublisher;
        public ChangeAccountStatusCommandHandler(AuthDBContext context, UserUpdatedEventPublisher eventPublisher)
        {
            _context = context;
            _eventPublisher = eventPublisher;
        }

        public async Task<Unit> Handle(ChangeAccountStatusCommand command, CancellationToken cancellationToken)
        {
            User user = await _context.Users
                .IgnoreQueryFilters()
                .SingleOrDefaultAsync(u => u.Email == command.dto.Email
                && u.Id == command.userId
                && u.TenantId == command.tenantId, cancellationToken);

            if (user is null)
                throw new Exception("User does not exist");

            bool passwordValid = BCrypt.Net.BCrypt.Verify(command.dto.Password, user.PasswordHash);
            if (!passwordValid)
                throw new Exception("Wrong email or password");

            user.UpdateStatus(IsActiveEnum.Inactive);

            await _context.SaveChangesAsync(cancellationToken);
            await _eventPublisher.PublishEvents(user);

            return Unit.Value;
        }
    }
}
