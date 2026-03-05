using MoodModule.Domain.Enums;

namespace MoodModule.Application.DTOs
{
    public class GetPreviousMoodsDto
    {
            public int CurrentMood { get; set; }
            public DateTime CreatedAt { get; set; }
        
    }
}
