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

                    if (!string.IsNullOrEmpty(userId))
                        context.Request.Headers["X-User-Id"] = userId;

                    if (!string.IsNullOrEmpty(tenantId))
                        context.Request.Headers["X-Tenant-Id"] = tenantId;
                }
            }

            await _next(context);
        }
    }
}
