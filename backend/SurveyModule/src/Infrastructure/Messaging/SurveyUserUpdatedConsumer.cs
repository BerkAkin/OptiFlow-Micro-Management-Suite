using MassTransit;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Events;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Infrastructure.Messaging
{
    public class SurveyUserUpdatedConsumer : IConsumer<UserUpdatedEvent>
    {
        private readonly SurveyDbContext _context;
        public SurveyUserUpdatedConsumer(SurveyDbContext context)
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
