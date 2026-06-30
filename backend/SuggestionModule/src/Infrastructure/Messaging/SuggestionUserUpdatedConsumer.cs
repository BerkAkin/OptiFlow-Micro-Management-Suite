using MassTransit;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Events;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Infrastructure.Messaging
{
    public class SuggestionUserUpdatedConsumer : IConsumer<UserUpdatedEvent>
    {
        private readonly SuggestionDbContext _context;
        public SuggestionUserUpdatedConsumer(SuggestionDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<UserUpdatedEvent> context)
        {
            var message = context.Message;

            var usr = await _context.Users.FirstOrDefaultAsync(u => u.Id == message.UserId && u.TenantId == message.TenantId);
            if (usr != null)
            {
                usr.ChangeStatus(message.Username, message.IsActive);
                await _context.SaveChangesAsync();
            }


        }
    }
}
