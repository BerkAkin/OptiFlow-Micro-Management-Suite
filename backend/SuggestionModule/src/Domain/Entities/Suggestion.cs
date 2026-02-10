using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Domain.Entities
{
    public class Suggestion
    {
        protected Suggestion() { }

        public Suggestion(
        string title,
        string description,
        int userId,
        int tenantId)
        {
            Title = title;
            Description = description;
            UserId = userId;
            TenantId = tenantId;
            Date = DateTime.UtcNow;
            Status = SuggestionStatus.Pending;
        }

        public int Id { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public int TenantId { get; private set; }
        public int UserId { get; private set; }
        public MiniUser User { get; private set; }
        public DateTime Date { get; private set; }
        public SuggestionStatus Status { get; private set; }

        private readonly List<Comment> _comments = new();
        public IReadOnlyCollection<Comment> Comments => _comments;
        public ICollection<Vote> Votes { get; set; } = new List<Vote>();

        public void ChangeStatus(SuggestionStatus newStatus)
        {
            if (Status == newStatus)
                return;
            Status = newStatus;
        }

         public void AddComment(int userId, string text)
         {
            var comment = new Comment(userId, text);
            _comments.Add(comment);
         }

    }
}
