namespace SurveyModule.Application.Middlewares
{
    public class CookieMiddleware
    {
        private readonly RequestDelegate _next;
        public CookieMiddleware(RequestDelegate next) {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Cookies.TryGetValue("TenantId", out var cookieValue))
            {
                context.Items["TenantId"] = cookieValue;
            }
            await _next(context);
        }
    }
}
