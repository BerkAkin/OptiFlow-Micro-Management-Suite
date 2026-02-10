using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Application.DTOs
{
    public class StatusDto
    {
        public SuggestionStatus Status { get; set; }
        public int SuggestionId { get; set; }
    }
}
