using ProjectMicro.Shared.Enums;

namespace ProjectMicro.Shared.Events
{
    public class UserUpdatedEvent
    {
        public int UserId { get; init; }
        public int TenantId { get; init; }
        public int DepartmentId { get; init; }
        public string Username { get; init; }
        public string Email { get; init; }
        public IsActiveEnum IsActive { get; init; }
    }
}
