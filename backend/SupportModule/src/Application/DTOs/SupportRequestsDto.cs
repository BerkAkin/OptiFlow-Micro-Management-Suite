namespace SupportModule.Application.DTOs
{
    public class SupportRequestsDto
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsClosed { get; set; } = false;
    }
}
