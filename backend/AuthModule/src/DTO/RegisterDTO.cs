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
        public DateTime BirthDate { get; set; }
        public List<int> SelectedModuleIds { get; set; } 
    }
}
