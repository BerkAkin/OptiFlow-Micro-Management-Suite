namespace SuggestionModule.Domain.Entities
{
    public class Tenant
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public bool IsActive { get; private set; }


        private readonly List<User> _users = new();
        public IReadOnlyCollection<User> Users => _users;

        private readonly List<Suggestion> _suggestions = new();
        public IReadOnlyCollection<Suggestion> Suggestions => _suggestions;


        private Tenant() { }

        public Tenant(int id, string name)
        {
            this.Id = id;
            this.Name = name;
            this.IsActive = true;
        }

        public void AddUser(int id, string fullname)
        {
            this._users.Add(new User(id, fullname, this.Id));
        }

        public Suggestion AddSuggestion(string title, string description, int userId)
        {

            Suggestion newSuggestion = new Suggestion(title, description, this.Id, userId);
            this._suggestions.Add(newSuggestion);
            return newSuggestion;
        }

    }
}
