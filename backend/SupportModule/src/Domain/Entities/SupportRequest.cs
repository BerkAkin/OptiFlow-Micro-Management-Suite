using SupportModule.Domain.Enums;

namespace SupportModule.Domain.Entities
{
    public class SupportRequest
    {
        public int Id { get; private set; }
        public int UserId { get; private set; }
        public MiniUser User { get; set; }
        public int TenantId { get; private set; }
        public SupportCategories Category { get; private set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public bool IsClosed { get; private set; } = false;

        private readonly List<SupportMessage> _messages = new();
        public IReadOnlyCollection<SupportMessage> Messages => _messages;
        private SupportRequest() { }
        public SupportRequest(int userId, int tenantId, SupportCategories category)
        {
            UserId = userId;
            TenantId = tenantId;
            Category = category;
            CreatedAt = DateTime.UtcNow;
            IsClosed = false;
        }
        public void AddMessage(string message, int senderId)
        {
           if (IsClosed)
              throw new Exception("Cannot add message to closed request");
           if (string.IsNullOrWhiteSpace(message))
              throw new Exception("Message cannot be empty");

            _messages.Add(new SupportMessage(message,senderId));

        }

        public void CloseRequest()
        {
            if (IsClosed) throw new Exception("Request is already closed");

            this.IsClosed = true;

        }
        public void ReopenRequest()
        {
            if (!IsClosed) throw new Exception("Request is already opened");

            this.IsClosed = false;
        }

    }
}
