namespace SupportModule.Domain.Entities
{
    public class SupportMessage
    {
        public int Id { get; private set; }
        public string Content { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public int SenderId { get; private set; }
        private SupportMessage() { }
        public SupportMessage(string content, int senderId)
        {
            if (string.IsNullOrWhiteSpace(content))
                throw new ArgumentException("Message cannot be empty");

            Content = content;
            SenderId = senderId;
            CreatedAt = DateTime.UtcNow;
        }
        public int SupportRequestId { get;private set; }
        public SupportRequest SupportRequest { get;private set; }
    }
}
