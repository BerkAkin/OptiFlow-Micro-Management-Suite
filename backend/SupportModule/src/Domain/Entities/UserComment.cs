namespace SupportModule.Domain.Entities
{
    public class UserComment
    {
        public int Id { get; private set; }
        public int UserId { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public string Comment { get; private set; }
        private UserComment() { }

        public UserComment(string comment, int userId)
        {
            Comment = comment;
            UserId = userId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
