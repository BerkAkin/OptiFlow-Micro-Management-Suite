using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;

namespace Gateway.Middlewares
{
    public class WebSocketAuthMiddleware
    {
        private readonly RequestDelegate _next;

        public WebSocketAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            string token = null;
            if (context.Request.Headers.TryGetValue("Authorization", out var authHeader))
            {
                token = authHeader.ToString().Replace("Bearer ", "");
            }
            else if (context.Request.Query.TryGetValue("access_token", out var queryToken))
            {
                token = queryToken;
            }

            if (!string.IsNullOrEmpty(token))
            {
                var handler = new JwtSecurityTokenHandler();
                if (handler.CanReadToken(token))
                {
                    var jwtToken = handler.ReadJwtToken(token);

                    var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
                    var tenantId = jwtToken.Claims.FirstOrDefault(c => c.Type == "tenantId")?.Value;
                    var departmentId = jwtToken.Claims.FirstOrDefault(c => c.Type == "departmentId")?.Value;
                    var companyName = jwtToken.Claims.FirstOrDefault(c => c.Type == "company")?.Value;

                    if (!string.IsNullOrEmpty(userId))
                        context.Request.Headers["X-User-Id"] = userId;

                    if (!string.IsNullOrEmpty(tenantId))
                        context.Request.Headers["X-Tenant-Id"] = tenantId;

                    if (!string.IsNullOrEmpty(departmentId))
                        context.Request.Headers["X-Department-Id"] = departmentId;

                    if (!string.IsNullOrEmpty(companyName))
                        context.Request.Headers["X-Company-Name"] = companyName;
                }
            }

            await _next(context);
        }
    }
}
