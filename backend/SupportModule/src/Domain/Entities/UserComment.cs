namespace SupportModule.Domain.Entities
{
    public class UserComment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MiniUser User { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Comment { get; set; }
    }
}
