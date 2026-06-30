
namespace ProjectMicro.Shared.Events
{
    public record SuggestionUserCreatedEvent
    {
        public int TenantId { get; init; }
        public string Tenantname { get; init; }
        public int UserId { get; init; }
        public string Username { get; init; }
    }
}
