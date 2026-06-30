
namespace ProjectMicro.Shared.Events
{
    public record SupportUserCreatedEvent
    {
        public int TenantId { get; init; }
        public string Tenantname { get; init; }
        public int UserId { get; init; }
        public string Username { get; init; }
        public string Email { get; init; }
        public int DepartmentId { get; set; }
    }
}
