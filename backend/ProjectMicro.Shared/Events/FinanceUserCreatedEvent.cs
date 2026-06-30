
namespace ProjectMicro.Shared.Events
{
    public record FinanceUserCreatedEvent
    {
        public int TenantId { get; init; }
        public string Tenantname { get; init; }
        public string Address { get; init; }
        public string PhoneNum { get; init; }
        public string? FaxNum { get; init; }
        public string MailAddress { get; init; }
        public string TaxOffice { get; init; }
        public string TaxNumber { get; init; }
        public string MersisNum { get; init; }
        public string TradeRegistryNum { get; init; }
    }
}
