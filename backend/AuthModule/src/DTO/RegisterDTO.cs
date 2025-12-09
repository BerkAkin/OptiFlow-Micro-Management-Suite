namespace AuthModule.DTO
{
    public class RegisterDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Tenant { get; set; }
        public string PhoneNum { get; set; }
        public int DepartmentId { get; set; }
        public string Street { get; set; }
        public string Street2 { get; set; }
        public string ApartmentNum { get; set; }
        public string DoorNumber { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string FullAddress { get; set; }
        public DateTime BirthDate { get; set; }
        public List<string> SelectedModuleIds { get; set; } 
    }
}
