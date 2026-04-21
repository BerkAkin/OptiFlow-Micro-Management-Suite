using AuthModule.Data;
using AuthModule.DTO;
using BCrypt.Net;
using MediatR;

namespace AuthModule.Services
{
    public record UpdatePasswordCommand(int currentUser,PasswordUpdateDto dto) :IRequest<Unit>;
    public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand,Unit>
    {
        private readonly AuthDBContext _context;
        public UpdatePasswordCommandHandler(AuthDBContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePasswordCommand command, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(command.currentUser);
            if (user == null) {
                throw new Exception("User does not exist"); 
            }

            string oldPassword = BCrypt.Net.BCrypt.HashPassword(command.dto.OldPassword);
            if (user.PasswordHash != oldPassword) {
                throw new Exception("Current Password Doesn't Match With Old Password");
            }
            if(command.dto.Password != command.dto.PasswordAgain)
            {
                throw new Exception("New Password Doesn't Match With Set Again Password");
            }

            string newPassword = BCrypt.Net.BCrypt.HashPassword(command.dto.Password);
            user.PasswordHash = newPassword;
            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
