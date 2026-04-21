using AuthModule.Data;
using AuthModule.DTO;
using AuthModule.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Services
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

            string resetToken = Guid.NewGuid().ToString();

            if (user.PasswordToken == null)
            {
                user.PasswordToken = new PasswordToken
                {
                    ResetToken = resetToken,
                    ExpireDate = DateTime.UtcNow.AddMinutes(15)
                };
            }
            else
            {
                user.PasswordToken.ResetToken = resetToken;
                user.PasswordToken.ExpireDate = DateTime.UtcNow.AddMinutes(15);
            }

            await _context.SaveChangesAsync();

            //FUTURE DEV: EVENT Yayınlanacak ve içerisinde email bilgisi ve resetToken gönderilecek. Event bildirim servisine gidecek
            //Daha sonra ordan bir e posta yayınlanacak ilgili usera
            //Eposta frontta bir ui açacak içerisinde password yenileme alanı olacak. Daha sonra email ve resetToken Tarihi kontrol edilecek
            //Emailden kullanıcı ve ona bağlı resettoken bulunup resettoken tarihi kontrol edilecek eğer geçmişse yeniden istek yapması istenecek
            //Eğer geçmemişse girilen yeni şifre başka bir servise hashlenip kullanıcının ilgili alanına yazılacak ve reset token alanları temizlenecek


            return Unit.Value;
        }
    }
}
