using AuthModule.Data;
using AuthModule.DTO;
using AuthModule.Models;
using AutoMapper;
using Azure;
using Microsoft.EntityFrameworkCore;


namespace AuthModule.Services
{
    public class AuthService
    {
        private readonly AuthDBContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly TokenCreateService _tokenCreateService;

        public AuthService(AuthDBContext context, TokenCreateService tokenCreateService, IMapper mapper, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _tokenCreateService = tokenCreateService;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
        }




        public async Task Register(RegisterDTO registerDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Email == registerDTO.Email);
            if (user is not null)
                throw new Exception("Email zaten kayıtlı");

            user = _mapper.Map<User>(registerDTO);
            user.DateCreate = DateTime.Now;
            user.DateUpdate = DateTime.Now;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

        }





        public async Task<string> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.Include(u=>u.RefreshToken)
                .Include(u=>u.Tenant).ThenInclude(t=>t.TenantModules).ThenInclude(tm=>tm.Module)
                .FirstOrDefaultAsync(u => u.Email == loginDTO.Email);

            if(user is null)
                throw new Exception("Kullanıcı bulunamadı");

            bool passwordValid = BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash);
            if(!passwordValid)
                throw new Exception("Email veya şifre hatalı");


            string accessToken = _tokenCreateService.GenerateAccessToken(user);
            var refreshToken = _tokenCreateService.GenerateRefreshToken(user.Id);


            if ( user.RefreshToken ==null){
                user.RefreshToken = refreshToken;
                _context.RefreshTokens.Add(refreshToken);
            }
            else{
                user.RefreshToken.Token = refreshToken.Token;
                user.RefreshToken.Expires = refreshToken.Expires;
                user.RefreshToken.Created = refreshToken.Created;
                _context.RefreshTokens.Update(user.RefreshToken);
            }

            await _context.SaveChangesAsync();


            _contextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });

            return accessToken;

        }



        public async Task<string> RefreshToken()
        {
            var refreshToken = _contextAccessor.HttpContext.Request.Cookies["refreshToken"];

            if (refreshToken is null)
                throw new Exception("Refresh token bulunamadı");


            var user = await _context.Users.Include(u => u.RefreshToken).FirstOrDefaultAsync(u => u.RefreshToken.Token == refreshToken);
            
            if (user == null || user.RefreshToken.Expires < DateTime.UtcNow)
                throw new Exception("Refresh token geçersiz veya süresi dolmuş"); //YENİDEN GİRİŞ YAPMALI Kİ TOKEN ALSIN


            var newAccessToken = _tokenCreateService.GenerateAccessToken(user);

            return newAccessToken;
        }


    }
}
