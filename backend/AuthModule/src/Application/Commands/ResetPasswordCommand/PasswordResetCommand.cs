using AuthModule.Application.DTOs;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.ResetPasswordCommand
{
    public record PasswordResetCommand(PasswordResetDto dto) : IRequest<Unit>;

    public class PasswordResetCommandHandler : IRequestHandler<PasswordResetCommand, Unit>
    {
        private readonly AuthDBContext _context;
        public PasswordResetCommandHandler(AuthDBContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(PasswordResetCommand query, CancellationToken cancellationToken)
        {
            var user = await _context.Users
               .Include(u => u.PasswordToken)
               .SingleOrDefaultAsync(u => u.Email == query.dto.Email, cancellationToken);

            if (user == null || user.PasswordToken == null || user.PasswordToken.ResetToken != query.dto.ResetToken)
            {
                throw new Exception("Geçersiz e-posta veya kod.");
            }

            if (query.dto.Password != query.dto.PasswordAgain)
            {
                throw new Exception("Yeni şifreler birbiriyle uyuşmuyor.");
            }

            if (!user.PasswordToken.Expires.HasValue || user.PasswordToken.Expires < DateTime.UtcNow)
            {
                throw new Exception("Şifre sıfırlama kodunun süresi dolmuş.");
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(query.dto.Password);
            user.ResetPassword(hashedPassword);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
