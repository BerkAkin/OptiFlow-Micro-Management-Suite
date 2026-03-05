using MoodModule.Domain.Enums;

namespace MoodModule.Application.DTOs
{
    public class GetMoodsDto
    {
        public string Employee { get; set; }
        public MoodEnum CurrentMood { get; set; }
        public string Mood => CurrentMood.ToString();
        public List<TagsEnum> CurrentTags { get; set; }
        public DateTime CreatedAt { get; set; } 
    }
}
