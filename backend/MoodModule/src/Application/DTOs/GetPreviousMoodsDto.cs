using MoodModule.Domain.Enums;

namespace MoodModule.Application.DTOs
{
    public class GetPreviousMoodsDto
    {
            public MoodEnum CurrentMood { get; set; }
            public DateTime CreatedAt { get; set; }
        
    }
}
