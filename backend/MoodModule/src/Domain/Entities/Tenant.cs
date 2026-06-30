using ProjectMicro.Shared.Enums;

namespace MoodModule.Domain.Entities
{
    public class Tenant
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public IsActiveEnum IsActive { get; private set; }


        private readonly List<User> _users = new();
        public IReadOnlyCollection<User> Users => _users;


        private Tenant() { }

        public Tenant(int id, string name)
        {
            this.Id = id;
            this.Name = name;
            this.IsActive = IsActiveEnum.Active;
        }

        public User AddUser(int id, string fullname, string email)
        {
            User usr = new User(this.Id, id, fullname, email);
            this._users.Add(usr);
            return usr;
        }
    }
}
