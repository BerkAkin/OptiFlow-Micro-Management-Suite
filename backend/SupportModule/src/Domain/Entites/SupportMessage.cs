namespace SupportModule.Domain.Entites
{
    public class SupportMessage
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int SenderId { get; set; }
        public int? ReceiverId { get; set; }
        public int SupportRequestId { get; set; }
        public SupportRequest SupportRequest { get; set; }
    }
}
