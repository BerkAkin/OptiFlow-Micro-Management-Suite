namespace SupportModule.Application.DTOs
{
    public class GetSupportMessagesDto
    {
        public string Content { get; set; }
        public int SenderId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
