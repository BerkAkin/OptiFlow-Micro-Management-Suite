using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Domain.Entities
{
    public class Suggestion
    {

        public int Id { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }

        public int TenantId { get; private set; }
        public Tenant Tenant { get; private set; }

        public int UserId { get; private set; }
        public User User { get; private set; }

        public DateTime Date { get; private set; }
        public SuggestionStatus Status { get; private set; }

        private readonly List<Comment> _comments = new();
        public IReadOnlyCollection<Comment> Comments => _comments;

        private readonly List<Vote> _votes = new();
        public IReadOnlyCollection<Vote> Votes => _votes;

        private Suggestion() { }

        public Suggestion(string title, string description, int tenantId, int userId)
        {
            this.Title = title;
            this.Description = description;
            this.UserId = userId;
            this.TenantId = tenantId;
            this.Date = DateTime.UtcNow;
            this.Status = SuggestionStatus.Pending;
        }

        public void ChangeStatus(SuggestionStatus newStatus)
        {
            if (Status == newStatus)
                return;
            this.Status = newStatus;
        }

        public void AddComment(int userId, string text)
        {
            _comments.Add(new Comment(this.Id, userId, text));
        }

        public void AddVote(int userId, VoteType voteType)
        {
            _votes.Add(new Vote(userId, this.Id, voteType));
        }

    }
}
