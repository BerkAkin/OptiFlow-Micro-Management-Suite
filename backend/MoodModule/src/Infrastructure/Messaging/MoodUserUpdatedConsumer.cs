using MassTransit;
using Microsoft.EntityFrameworkCore;
using MoodModule.Infrastructure.Persistence;
using ProjectMicro.Shared.Events;

namespace MoodModule.Infrastructure.Messaging
{
    public class MoodUserUpdatedConsumer : IConsumer<UserUpdatedEvent>
    {
        private readonly MoodDbContext _context;
        public MoodUserUpdatedConsumer(MoodDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<UserUpdatedEvent> context)
        {
            var message = context.Message;

            var usr = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == message.UserId && u.TenantId == message.TenantId);
            if (usr != null)
            {
                usr.ChangeStatus(message.Username, message.Email, message.IsActive);
                await _context.SaveChangesAsync();
            }


        }
    }
}
