namespace SupportModule.Application.DTOs
{
    public class GetSupportMessagesDto
    {
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsMine { get; set; }
    }
}
