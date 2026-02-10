using System.IdentityModel.Tokens.Jwt;

namespace Gateway.Handlers
{
    public class JwtToHeaderHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if(request.Headers.Authorization!= null && request.Headers.Authorization.Scheme == "Bearer")
            {
                var token = request.Headers.Authorization.Parameter;

                var handler = new JwtSecurityTokenHandler();
                var jwt  = handler.ReadJwtToken(token);

                var userId = jwt.Claims.FirstOrDefault(x => x.Type == "userId")?.Value;
                var tenantId = jwt.Claims.FirstOrDefault(x => x.Type == "tenantId")?.Value;
                var email = jwt.Claims.FirstOrDefault(x => x.Type == "email")?.Value;

                if (userId != null)
                {
                    request.Headers.Add("X-User-Id", userId);
                }
                if (tenantId != null)
                {
                    request.Headers.Add("X-Tenant-Id", tenantId);
                }
                if (userId != null)
                {
                    request.Headers.Add("X-User-Email", email);
                }
            }
            return await base.SendAsync(request, cancellationToken);
        }
    }
}
