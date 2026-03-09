using MoodModule.Domain.Enums;

namespace MoodModule.Application.DTOs
{
    public class GetMoodsDto
    {
        public string Employee { get; set; }
        public string Mood { get; set; }
        public List<string> Tags { get; set; }
        public DateTime Date { get; set; } 
    }
}
