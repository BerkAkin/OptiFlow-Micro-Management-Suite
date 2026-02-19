using Microsoft.AspNetCore.Http;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Models;

namespace ProjectMicro.Shared.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _contextAccessor;
    public CurrentUserService(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }

    public CurrentUser User
    {
        get
        {
            var context = _contextAccessor.HttpContext;
            if (context == null)
            {
                return null;
            }
            return new CurrentUser
            {
                TenantId = int.Parse(context.Request.Headers["X-Tenant-Id"]),
                UserId = int.Parse(context.Request.Headers["X-User-Id"]),
            };
        }
    }
}
