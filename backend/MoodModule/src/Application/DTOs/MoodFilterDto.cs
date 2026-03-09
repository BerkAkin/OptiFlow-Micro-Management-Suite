using MoodModule.Domain.Enums;

namespace MoodModule.Application.DTOs
{
    public class MoodFilterDto
    {
        public string? Mood { get; set; }
        public string? Date { get; set; }
        public int Page { get; set; }

    }
}
