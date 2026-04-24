using AuthModule.Enums;

namespace AuthModule.DTO
{
    public class EmployeesDto
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public string Department { get; set; }
        public string Address { get; set; }
        public IsActiveEnum IsActive { get; set; }

    }
}
