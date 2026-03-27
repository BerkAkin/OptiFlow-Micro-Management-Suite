namespace SupportModule.Application.DTOs
{
    public class CreateDayOffDto
    {
            public string Topic { get; set; }
            public string Description { get; set; }
            public int Days { get; set; }
            public DateTime StartingDate { get; set; }
    }
}
