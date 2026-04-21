using AuthModule.Data;
using AuthModule.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Services
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
               .SingleOrDefaultAsync(u => u.Email == query.dto.Email);

            if (user == null || user.PasswordToken == null || user.PasswordToken.ResetToken != query.dto.ResetToken)
            {
                throw new Exception("Invalid token or email.");
            }

            if (query.dto.Password != query.dto.PasswordAgain)
            {
                throw new Exception("Confirmation password and new password does not match");
            }

            if (!user.PasswordToken.ExpireDate.HasValue || user.PasswordToken.ExpireDate < DateTime.UtcNow)
            {
                throw new Exception("Token has expired or is invalid.");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(query.dto.Password);
            user.DateUpdate = DateTime.UtcNow;

            user.PasswordToken.ResetToken = null;
            user.PasswordToken.ExpireDate = null;

            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
