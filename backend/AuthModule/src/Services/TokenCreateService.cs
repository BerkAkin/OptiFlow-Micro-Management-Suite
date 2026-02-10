using AuthModule.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace AuthModule.Services
{
    public class TokenCreateService
    {
        private readonly string _secretKey;
        private readonly int _expiryMinutes;

        public TokenCreateService(string secretKey, int expiryMinutes)
        {
            _secretKey = secretKey;
            _expiryMinutes = expiryMinutes;
        }


        public string GenerateAccessToken(User user) {

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("userId",user.Id.ToString()),
                new Claim("tenantId", user.TenantId.ToString()),
                new Claim("departmentId",user.DepartmentId.ToString()),
                new Claim("email",user.Email.ToString()),
            };

            foreach (var module in user.Tenant.TenantModules.Select(m => m.Module.Name))
                claims.Add(new Claim("permissions", module));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "AuthModule",
                audience: "Gateway",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_expiryMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }




        public RefreshToken GenerateRefreshToken (int userId, int daysValid = 7)
        {
            return new RefreshToken
            {
                UserId = userId,
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(daysValid),
                Created = DateTime.UtcNow
            };

        }
    }
}
