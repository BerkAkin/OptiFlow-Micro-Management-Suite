using FinanceModule.DBOperations;
using FinanceModule.Entities;
using MassTransit;
using ProjectMicro.Shared.Events;

namespace FinanceModule.Infrastructure.Messaging
{
    public class FinanceUserCreatedConsumer : IConsumer<FinanceUserCreatedEvent>
    {
        private readonly FinanceDBContext _context;
        public FinanceUserCreatedConsumer(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<FinanceUserCreatedEvent> context)
        {
            var message = context.Message;

            var tenant = await _context.Tenants.FindAsync(message.TenantId);
            if (tenant is not null)
            {
                throw new Exception("Company already registered");
            }

            TenantSummary newTenant = new TenantSummary
            (
             message.TenantId, message.Tenantname, message.Address,
             message.PhoneNum, message.FaxNum, message.MailAddress,
             message.TaxOffice, message.TaxNumber, message.MersisNum,
             message.TradeRegistryNum
            );

            await _context.Tenants.AddAsync(newTenant);
            await _context.SaveChangesAsync();


        }
    }
}
