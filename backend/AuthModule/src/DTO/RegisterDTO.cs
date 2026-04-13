namespace AuthModule.DTO
{
    public class RegisterDTO
    {
        //KULLANICI BİLGİLERİ
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNum { get; set; }
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }
        public string Street2 { get; set; }
        public string ApartmentNum { get; set; }
        public string DoorNumber { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string FullAddress { get; set; }


        //TENANT BİLGİLERİ

        public string Tenant { get; set; }
        public string Address { get; set; }
        public string TenantPhoneNum { get; set; }
        public string? FaxNum { get; set; }
        public string TenantEmail { get; set; }
        public string TaxOffice { get; set; }
        public string TaxNumber { get; set; }
        public string MersisNum { get; set; }
        public string TradeRegistryNum { get; set; }

        public List<string> SelectedModuleIds { get; set; } 
    }
}
