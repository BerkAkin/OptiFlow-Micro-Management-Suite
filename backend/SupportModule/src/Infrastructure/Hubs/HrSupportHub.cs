using Microsoft.AspNetCore.SignalR;

namespace SupportModule.Infrastructure.Hubs
{
    public class HrSupportHub : Hub
    {
        public async Task SendToUser(string receiverUserId, string message)
        {
                var senderId = Context.UserIdentifier ?? "BilinmeyenGonderici";            
                await Clients.User(receiverUserId).SendAsync("ReceiveMessage", senderId, message);
        }
    }
}
