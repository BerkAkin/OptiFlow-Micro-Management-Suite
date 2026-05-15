using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Domain.Entities
{
    public class Vote
    {

        public int Id { get; private set; }

        public int UserId { get; private set; }
        public User User { get; private set; }

        public int SuggestionId { get; private set; }
        public Suggestion Suggestion { get; private set; }
        public VoteType VoteType { get; private set; }

        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        private Vote() { }
        public Vote(int userId, int suggestionId, VoteType voteType)
        {

            this.UserId = userId;
            this.SuggestionId = suggestionId;
            this.VoteType = voteType;
            this.CreatedAt = DateTime.UtcNow;
        }
        public void ChangeVote(VoteType voteType)
        {
            this.VoteType = voteType;
            this.UpdatedAt = DateTime.UtcNow;

        }
    }
}
