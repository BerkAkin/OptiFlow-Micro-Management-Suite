namespace SupportModule.Domain.Entites
{
    public class SupportRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TenantId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsClosed { get; set; } = false;
        public ICollection<SupportMessage> SupportMessages { get; set; } = new List<SupportMessage>();

    }
}
