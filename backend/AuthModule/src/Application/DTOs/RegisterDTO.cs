namespace AuthModule.Application.DTOs
{
    public class RegisterDTO
    {
        //KULLANICI BİLGİLERİ
        public string Firstname { get; set; }
        public string Lastname { get; set; }
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
        public int? DepartmentId { get; set; }



        //TENANT BİLGİLERİ

        public string TenantName { get; set; }
        public string TenantAddress { get; set; }
        public string TenantPhoneNum { get; set; }
        public string? TenantFaxNum { get; set; }
        public string TenantEmail { get; set; }
        public string TenantTaxOffice { get; set; }
        public string TenantTaxNumber { get; set; }
        public string TenantMersisNum { get; set; }
        public string TenantTradeRegistryNum { get; set; }

        public List<int> SelectedModuleIds { get; set; } 
    }
}
