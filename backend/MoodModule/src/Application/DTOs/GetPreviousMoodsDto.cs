using MoodModule.Domain.Enums;

namespace MoodModule.Application.DTOs
{
    public class GetPreviousMoodsDto
    {
            public MoodEnum Mood { get; set; }
            public DateTime Date { get; set; }
        
    }
}
