namespace SuggestionModule.Domain.Entities
{
    public class Comment
    {
        public int Id { get; private set; }
        public string Text { get; private set; }

        public int UserId { get; private set; }
        public User User { get; private set; }

        public int SuggestionId { get; private set; }
        public Suggestion Suggestion { get; private set; }

        private Comment() { }
        public Comment(int suggestionId, int userId, string text)
        {
            this.UserId = userId;
            this.Text = text;
            this.SuggestionId = suggestionId;
        }
    }
}
