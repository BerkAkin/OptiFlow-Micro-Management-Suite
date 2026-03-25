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

    }
}
