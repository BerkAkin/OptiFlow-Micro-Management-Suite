using MassTransit;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Events;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Infrastructure.Messaging
{
    public class SupportUserUpdatedConsumer : IConsumer<UserUpdatedEvent>
    {
        private readonly SupportDbContext _context;
        public SupportUserUpdatedConsumer(SupportDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<UserUpdatedEvent> context)
        {
            var message = context.Message;

            var usr = await _context.Users.FirstOrDefaultAsync(u => u.Id == message.UserId && u.TenantId == message.TenantId);
            if (usr != null)
            {
                usr.ChangeStatus(message.Username, message.Email, message.DepartmentId, message.IsActive);
                await _context.SaveChangesAsync();
            }


        }
    }
}
