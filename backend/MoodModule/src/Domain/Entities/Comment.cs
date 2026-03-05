namespace MoodModule.Domain.Entities
{
    public class Comment
    {
        public int Id { get; private set; }
        public string Content { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public MiniUser User { get; private set; }
        public int UserId { get; private set; }
        public int TenantId { get; private set; }

        private Comment() { }
        public Comment(int UserId, int TenantId, string Content) {

            this.Content = Content;
            this.UserId = UserId;
            this.TenantId= TenantId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
