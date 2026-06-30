
using ProjectMicro.Shared.Enums;

namespace AuthModule.Application.DTOs
{
    public class EmployeeDetailsDto
    {
        public string Email { get; set; }
        public string Department { get; set; }
        public int DepartmentId { get; set; }
        public IsActiveEnum IsActive { get; set; }
    }
}
