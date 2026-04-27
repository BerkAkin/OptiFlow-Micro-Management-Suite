using AuthModule.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;


namespace AuthModule.Application.Services
{
    public class RefreshTokenService
    {
        private readonly AuthDBContext _context;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly TokenService _tokenCreateService;

        public RefreshTokenService(AuthDBContext context, TokenService tokenCreateService,IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _tokenCreateService = tokenCreateService;
            _contextAccessor = contextAccessor;
        }


        public async Task<string> RefreshToken()
        {
            var refreshToken = _contextAccessor.HttpContext.Request.Cookies["refreshToken"];

            if (refreshToken is null)
                throw new Exception("Refresh token bulunamadı");


            var user = await _context.Users.Include(u=>u.RefreshToken).Include(u => u.Tenant).ThenInclude(t => t.TenantModules).ThenInclude(tm => tm.Module)
                .FirstOrDefaultAsync(u => u.RefreshToken.Token == refreshToken);

            if (user == null || user.RefreshToken.Expires < DateTime.UtcNow)
                throw new Exception("Refresh token geçersiz veya süresi dolmuş"); 


            var newAccessToken = _tokenCreateService.GenerateAccessToken(user);

            return newAccessToken;
        }


    }
}
