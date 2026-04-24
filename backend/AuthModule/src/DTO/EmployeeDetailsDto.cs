using AuthModule.Enums;

namespace AuthModule.DTO
{
    public class EmployeeDetailsDto
    {
        public string Email { get; set; }
        public int Department { get; set; }
        public IsActiveEnum IsActive { get; set; }
    }
}
