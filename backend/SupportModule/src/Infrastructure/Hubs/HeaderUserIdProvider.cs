using Microsoft.AspNetCore.SignalR;

namespace SupportModule.Infrastructure.Hubs
{
    public class HeaderUserIdProvider : IUserIdProvider
    {
        public string? GetUserId(HubConnectionContext connection)
        {
                var context = connection.GetHttpContext();
                var userId= context.Request.Headers["X-User-Id"].ToString();
                return userId;
        }
    }
}
