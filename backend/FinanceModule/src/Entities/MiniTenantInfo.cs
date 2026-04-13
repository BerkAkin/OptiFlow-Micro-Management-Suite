namespace FinanceModule.Entities
{
    public class MiniTenantInfo
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNum { get; set; }
        public string? FaxNum { get; set; }
        public string MailAddress { get; set; }
        public string TaxOffice { get; set; }
        public string TaxNumber { get; set; }
        public string MersisNum { get; set; }
        public string TradeRegistryNum { get; set; }
    }
}
