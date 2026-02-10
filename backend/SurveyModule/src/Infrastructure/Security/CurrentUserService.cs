namespace SurveyModule.Infrastructure.Security
{
    public class CurrentUserService: ICurrentUserService
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
                    UserId = int.Parse(context.Request.Headers["X-User-Id"]),
                    TenantId = int.Parse(context.Request.Headers["X-Tenant-Id"]),
                    Email = context.Request.Headers["X-User-Email"]
                };
            }
        }
    }
}
