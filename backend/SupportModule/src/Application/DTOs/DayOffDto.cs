namespace SupportModule.Application.DTOs
{
    public class DayOffDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } 
        public string Topic { get; set; }
        public string Description { get; set; }
        public int Days { get; set; }
        public DateTime StartingDate { get; set; }
        public int Status { get; set; }
    }
}
