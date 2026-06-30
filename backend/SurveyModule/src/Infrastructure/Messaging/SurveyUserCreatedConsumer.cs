using MassTransit;
using ProjectMicro.Shared.Events;
using SurveyModule.Domain.Entities;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Infrastructure.Messaging
{
    public class SurveyUserCreatedConsumer : IConsumer<SurveyUserCreatedEvent>
    {
        private readonly SurveyDbContext _context;

        public SurveyUserCreatedConsumer(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<SurveyUserCreatedEvent> context)
        {
            var message = context.Message;

            var tenant = await _context.Tenants.FindAsync(message.TenantId);

            if (tenant is null)
            {
                tenant = new Tenant(message.TenantId, message.Tenantname);
                await _context.Tenants.AddAsync(tenant);
            }

            tenant.AddUser(message.UserId, message.Username);

            await _context.SaveChangesAsync();

        }
    }
}
