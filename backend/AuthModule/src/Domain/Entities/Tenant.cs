using ProjectMicro.Shared.Enums;

namespace AuthModule.Domain.Entities
{
    public class Tenant
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
        public string PhoneNum { get; private set; }
        public string? FaxNum { get; private set; }
        public string Email { get; private set; }
        public string TaxOffice { get; private set; }
        public string TaxNumber { get; private set; }
        public string MersisNum { get; private set; }
        public string TradeRegistryNum { get; private set; }
        public IsActiveEnum IsActive { get; private set; }


        private readonly List<User> _users = new();
        public IReadOnlyCollection<User> Users => _users;

        private readonly List<TenantModule> _tenantModules = new();
        public IReadOnlyCollection<TenantModule> TenantModules => _tenantModules;

        private Tenant() { }

        public Tenant(string name, string address, string phoneNum, string? faxNum, string email, string taxOffice, string taxNumber, string mersisNum, string tradeNum)
        {
            Name = name;
            Address = address;
            PhoneNum = phoneNum;
            FaxNum = faxNum;
            Email = email;
            TaxOffice = taxOffice;
            TaxNumber = taxNumber;
            MersisNum = mersisNum;
            TradeRegistryNum = tradeNum;
            IsActive = IsActiveEnum.Active;
        }

        public User AddUser(
             string firstname, string lastname, string email, string passwordHash, string phoneNum, DateTime birthdate
            , string street, string street2, string apartment, string door,
            string province, string district, string fullAddress, int departmentId
        )
        {

            if (_users.Any(u => u.Email == email))
            {
                throw new InvalidOperationException("Bu e-posta adresi ile zaten bir kullanıcı mevcut.");
            }

            User newUser = new User(
                firstname, lastname, email, passwordHash, phoneNum, birthdate,
                null, IsActiveEnum.Active, street, street2, apartment, door,
                province, district, fullAddress, DateTime.Now, DateTime.Now,
                this.Id, departmentId
            );

            _users.Add(newUser);
            return newUser;
        }


        public void AssignModule(int moduleId)
        {
            if (_tenantModules.Any(tm => tm.ModuleId == moduleId))
            {
                throw new InvalidOperationException($"{this.Name} zaten bu modüle sahip.");
            }

            var tenantModule = new TenantModule(this.Id, moduleId);
            _tenantModules.Add(tenantModule);
        }
    }
}
