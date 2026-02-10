
using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Application.DTOs
{
    public class VoteDto
    {
        public int SuggestionId { get; set; }
        public VoteType VoteType { get; set; }
    }
}
