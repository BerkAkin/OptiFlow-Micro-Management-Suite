namespace SuggestionModule.Domain.Entities
{
    public class MiniUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public ICollection<Vote> Votes { get; set; } = new List<Vote>();
        public ICollection<Suggestion> Suggestions { get; set; } = new List<Suggestion>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
