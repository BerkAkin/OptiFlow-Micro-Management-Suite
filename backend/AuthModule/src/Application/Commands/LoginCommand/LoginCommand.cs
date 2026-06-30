using AuthModule.Application.DTOs;
using AuthModule.Application.Services;
using AuthModule.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Application.Commands.LoginCommand
{
    public record LoginCommand(LoginDTO dto) : IRequest<string>;
    public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
    {
        private readonly AuthDBContext _context;
        private readonly TokenService _tokenCreateService;
        private IHttpContextAccessor _contextAccessor;
        public LoginCommandHandler(AuthDBContext context, TokenService tokenCreateService, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _tokenCreateService = tokenCreateService;
            _contextAccessor = contextAccessor;
        }

        public async Task<string> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(u => u.RefreshToken).Include(u => u.Department)
            .Include(u => u.Tenant).ThenInclude(t => t.TenantModules).ThenInclude(tm => tm.Module)
            .FirstOrDefaultAsync(u => u.Email == command.dto.Email);

            if (user is null)
                throw new Exception("User does not exist");

            bool passwordValid = BCrypt.Net.BCrypt.Verify(command.dto.Password, user.PasswordHash);
            if (!passwordValid)
                throw new Exception("Wrong email or password");


            string accessToken = _tokenCreateService.GenerateAccessToken(user);


            var refreshToken = _tokenCreateService.GenerateRefreshToken();
            user.AddRefreshToken(refreshToken);
            await _context.SaveChangesAsync();



            _contextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });


            return accessToken;
        }
    }
}
