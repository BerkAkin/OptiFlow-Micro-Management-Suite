using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using AuthModule.Domain.Entities;

namespace AuthModule.Application.Services
{
    public class TokenService
    {
        private readonly string _secretKey;
        private readonly int _expiryMinutes;

        public TokenService(string secretKey, int expiryMinutes)
        {
            _secretKey = secretKey;
            _expiryMinutes = expiryMinutes;
        }


        public string GenerateAccessToken(User user) {

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), 
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

                new Claim("fullname",$"{user.Firstname} {user.Lastname}"),
                new Claim("company", user.Tenant.Name.ToString()),
                new Claim("tenantId", user.TenantId.ToString()),
                new Claim("department",user.Department.Name.ToString()),
                new Claim("departmentId",user.DepartmentId.ToString()),
                new Claim("profilePicture",user.ProfilePicture ?? ""),
            };

            if (user.Tenant?.TenantModules != null)
            {
                foreach (var tenantModule in user.Tenant.TenantModules)
                {
                    claims.Add(new Claim(ClaimTypes.Role, tenantModule.Module.Name));
                }
            }

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




        public string GenerateRefreshToken ()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        }

    }
}
