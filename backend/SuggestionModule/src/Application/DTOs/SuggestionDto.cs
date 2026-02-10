using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Application.DTOs
{
    public class SuggestionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public SuggestionStatus Status { get; set; }
        public int Votes { get; set; } 
        public ICollection<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}
