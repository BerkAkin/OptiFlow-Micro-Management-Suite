using MassTransit;
using MoodModule.Domain.Entities;
using MoodModule.Infrastructure.Persistence;
using ProjectMicro.Shared.Events;

namespace MoodModule.Infrastructure.Messaging
{
    public class MoodUserCreatedConsumer : IConsumer<MoodUserCreatedEvent>
    {
        private readonly MoodDbContext _context;
        public MoodUserCreatedConsumer(MoodDbContext context)
        {
            _context = context;
        }
        public async Task Consume(ConsumeContext<MoodUserCreatedEvent> context)
        {
            var message = context.Message;

            var tenant = await _context.Tenants.FindAsync(message.TenantId);

            if (tenant == null)
            {
                tenant = new Tenant(message.TenantId, message.Tenantname);
                await _context.Tenants.AddAsync(tenant);
            }

            tenant.AddUser(message.UserId, message.Username, message.Email);

            await _context.SaveChangesAsync();


        }
    }
}
