using ProjectMicro.Shared.Enums;

namespace SuggestionModule.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string Fullname { get; private set; }

        public int TenantId { get; private set; }
        public Tenant Tenant { get; private set; }

        public IsActiveEnum IsActive { get; private set; }

        private readonly List<Suggestion> _suggestions = new();
        public IReadOnlyCollection<Suggestion> Suggestions => _suggestions;

        private readonly List<Vote> _votes = new();
        public IReadOnlyCollection<Vote> Votes => _votes;

        private readonly List<Comment> _comments = new();
        public IReadOnlyCollection<Comment> Comments => _comments;

        private User() { }
        public User(int id, string fullname, int tenantId)
        {
            this.Id = id;
            this.Fullname = fullname;
            this.TenantId = tenantId;
            this.IsActive = IsActiveEnum.Active;
        }

        public void ChangeStatus(string fullname, IsActiveEnum status)
        {
            this.IsActive = status;
            this.Fullname = fullname;
        }

    }
}
