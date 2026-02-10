namespace SuggestionModule.Domain.Entities
{
    public class Comment
    {
        protected Comment() { }
        public int Id { get; private set; }
        public string Text { get; private set; }
        public int UserId { get; private set; }
        internal int SuggestionId { get; private set; }
        internal Suggestion Suggestion { get; private set; }
        public MiniUser User { get; private set; }
        internal Comment(int userId, string text) {
            UserId = userId;
            Text = text;
        }
    }
}
