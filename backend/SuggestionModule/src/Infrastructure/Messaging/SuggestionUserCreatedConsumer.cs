using MassTransit;
using ProjectMicro.Shared.Events;
using SuggestionModule.Domain.Entities;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Infrastructure.Messaging
{
    public class SuggestionUserCreatedConsumer : IConsumer<SuggestionUserCreatedEvent>
    {
        private readonly SuggestionDbContext _context;
        public SuggestionUserCreatedConsumer(SuggestionDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<SuggestionUserCreatedEvent> context)
        {
            var message = context.Message;

            var tenant = await _context.Tenants.FindAsync(message.TenantId);

            if (tenant == null)
            {
                tenant = new Tenant(message.TenantId, message.Tenantname);
                await _context.Tenants.AddAsync(tenant);
            }

            tenant.AddUser(message.UserId, message.Username);

            await _context.SaveChangesAsync();

        }
    }
}
