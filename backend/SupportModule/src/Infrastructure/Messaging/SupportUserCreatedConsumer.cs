using MassTransit;
using ProjectMicro.Shared.Events;
using SupportModule.Domain.Entities;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Infrastructure.Messaging
{
    public class SupportUserCreatedConsumer : IConsumer<SupportUserCreatedEvent>
    {
        private readonly SupportDbContext _context;
        public SupportUserCreatedConsumer(SupportDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<SupportUserCreatedEvent> context)
        {
            var message = context.Message;

            var tenant = await _context.Tenants.FindAsync(message.TenantId);

            if (tenant == null)
            {
                tenant = new Tenant(message.TenantId, message.Tenantname);
                await _context.Tenants.AddAsync(tenant);
            }

            tenant.AddUser(message.Username, message.Email, message.UserId, message.DepartmentId);

            await _context.SaveChangesAsync();
        }
    }
}
