namespace SupportModule.Domain.Entities
{
    public class MiniUser
    {
        public int Id { get; private set; }
        public int TenantId { get; private set; }
        public string Username { get; private set; }
        public int DepartmentId { get; private set; }
        public string Email { get; private set; }

        private readonly List<SupportRequest> _supportRequests = new();
        public IReadOnlyCollection<SupportRequest> SupportRequests => _supportRequests;

        private readonly List<DayOff> _dayOffs = new();
        public IReadOnlyCollection<DayOff> DayOffs=> _dayOffs;
        public MiniUser(string username, string email, int tenantId, int departmentId)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new ArgumentException("Username cannot be empty");
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty");

            Username = username;
            Email = email;
            TenantId = tenantId;
            DepartmentId = departmentId;
        }

        public void AddDayOff(string Topic, string Description, int Days, DateTime StartingDate)
        {
            _dayOffs.Add(new DayOff(this.TenantId, Topic, Description, Days, StartingDate));
        }

    }
}
