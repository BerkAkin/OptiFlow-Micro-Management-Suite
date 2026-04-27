using AuthModule.Application.DTOs;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.RequestResetPasswordCommand
{
    public record PasswordRequestResetCommand(PasswordResetRequestDto passwordResetRequest):IRequest<Unit>;

    public class PasswordRequestResetCommandHandler : IRequestHandler<PasswordRequestResetCommand, Unit>
    {
        private readonly AuthDBContext _context;
        public PasswordRequestResetCommandHandler(AuthDBContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(PasswordRequestResetCommand query, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(u => u.PasswordToken)
                .SingleOrDefaultAsync(u => u.Email == query.passwordResetRequest.Email);

            if (user is null)
                throw new Exception("Bu e-posta adresine kayıtlı kullanıcı bulunamadı.");

            string resetToken = Guid.NewGuid().ToString();

            user.AddPasswordToken(resetToken);

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
