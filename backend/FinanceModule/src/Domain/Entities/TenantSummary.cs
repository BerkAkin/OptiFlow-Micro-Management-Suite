
using ProjectMicro.Shared.Enums;

namespace FinanceModule.Entities
{
    public class TenantSummary
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
        public string PhoneNum { get; private set; }
        public string? FaxNum { get; private set; }
        public string MailAddress { get; private set; }
        public string TaxOffice { get; private set; }
        public string TaxNumber { get; private set; }
        public string MersisNum { get; private set; }
        public string TradeRegistryNum { get; private set; }
        public IsActiveEnum IsActive { get; private set; }

        private readonly List<Transaction> _transaction = new();
        public IReadOnlyCollection<Transaction> Transactions => _transaction;

        private readonly List<Invoice> _invoices = new();
        public IReadOnlyCollection<Invoice> Invoices => _invoices;


        private TenantSummary() { }

        public TenantSummary(
            int id, string name, string address, string phoneNum,
            string? faxNum, string mailAddress, string taxOffice,
            string taxNumber, string mersisNum, string tradeRegistryNum)
        {
            this.Id = id;
            this.Name = name;
            this.Address = address;
            this.PhoneNum = phoneNum;
            this.FaxNum = faxNum;
            this.MailAddress = mailAddress;
            this.TaxOffice = taxOffice;
            this.TaxNumber = taxNumber;
            this.MersisNum = mersisNum;
            this.TradeRegistryNum = tradeRegistryNum;
            this.IsActive = IsActiveEnum.Active;
        }

        public void AddTransaction(
            int quantity, string who, string exchangeType, DateTime date,
            string description, bool isPartly, int partCount, decimal price,
            bool isIncome, string category, string invoicePath)
        {
            _transaction.Add(new Transaction(quantity, who, exchangeType, date, description, isPartly, partCount, price, isIncome, category, invoicePath));
        }

        public Invoice AddInvoice(
            string firstName, string lastName, string address, string personSerialNum, string phoneNum,
            string email, DateTime orderDate)
        {
            var invoice = new Invoice(firstName, lastName, address, personSerialNum, phoneNum, email, orderDate);
            _invoices.Add(invoice);
            return invoice;
        }


    }
}
