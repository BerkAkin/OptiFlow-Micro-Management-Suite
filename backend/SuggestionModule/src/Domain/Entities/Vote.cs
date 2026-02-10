using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Domain.Entities
{
    public class Vote
    {
        protected Vote() { }
        public Vote(int userId,int suggestionId,VoteType voteType) { 
            
            UserId = userId;
            SuggestionId = suggestionId;
            VoteType = voteType;
        }

        public int Id { get; private set; }
        public int UserId { get; private set; }
        public MiniUser User { get; private set; }
        public int SuggestionId { get; private set; }
        public Suggestion Suggestion { get; private set; }
        public VoteType VoteType { get; private set; }

        public void ChangeVote(VoteType voteType)
        {
            VoteType = voteType;
        }
    }
}
