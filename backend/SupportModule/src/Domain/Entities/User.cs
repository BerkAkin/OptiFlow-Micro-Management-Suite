using ProjectMicro.Shared.Enums;

namespace SupportModule.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public int TenantId { get; private set; }
        public Tenant Tenant { get; private set; }
        public string Username { get; private set; }
        public int DepartmentId { get; private set; }
        public string Email { get; private set; }
        public IsActiveEnum IsActive { get; private set; }

        private readonly List<SupportRequest> _supportRequests = new();
        public IReadOnlyCollection<SupportRequest> SupportRequests => _supportRequests;

        private readonly List<DayOff> _dayOffs = new();
        public IReadOnlyCollection<DayOff> DayOffs => _dayOffs;

        private User() { }
        public User(string username, string email, int id, int tenantId, int departmentId)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new ArgumentException("Username cannot be empty");
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty");

            Id = id;
            Username = username;
            Email = email;
            TenantId = tenantId;
            DepartmentId = departmentId;
            IsActive = IsActiveEnum.Active;
        }

        public void ChangeStatus(string fullname, string email, int departmentId, IsActiveEnum status)
        {
            this.IsActive = status;
            this.DepartmentId = DepartmentId;
            this.Email = email;
            this.Username = fullname;
        }


        public void AddDayOff(string Topic, string Description, int Days, DateTime StartingDate)
        {
            _dayOffs.Add(new DayOff(this.TenantId, Topic, Description, Days, StartingDate));
        }

    }
}
