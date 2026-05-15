namespace SupportModule.Domain.Entities
{
    public class Tenant
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public bool IsActive { get; private set; }


        private readonly List<User> _users = new();
        public IReadOnlyCollection<User> Users => _users;



        private Tenant() { }

        public Tenant(int id, string name)
        {
            this.Id = id;
            this.Name = name;
            this.IsActive = true;
        }

        public User AddUser(string fullname, string email, int id,int departmentId)
        {
            User usr = new User(fullname,email,id,this.Id,departmentId);
            this._users.Add(usr);
            return usr;
        }

    }
}
