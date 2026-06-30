
namespace ProjectMicro.Shared.Events
{
    public record SurveyUserCreatedEvent
    {
        public int TenantId { get; init; }
        public string Tenantname { get; init; }
        public int UserId { get; init; }
        public string Username { get; init; }
    }
}
