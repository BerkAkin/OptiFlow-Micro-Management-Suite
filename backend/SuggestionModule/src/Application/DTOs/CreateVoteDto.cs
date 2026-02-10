using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Application.DTOs
{
    public class CreateVoteDto
    {
        public int SuggestionId { get; set; }
        public int UserId { get; set; }
        public VoteType VoteType { get; set; }
    }
}
