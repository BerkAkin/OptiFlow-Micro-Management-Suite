using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Application.DTOs
{
    public class CreateVoteDto
    {
        public VoteType VoteType { get; set; }
    }
}
