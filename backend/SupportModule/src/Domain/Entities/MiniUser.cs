namespace SupportModule.Domain.Entities
{
    public class MiniUser
    {
        public int Id { get; private set; }
        public int TenantId { get; private set; }
        public string Username { get; private set; }
        public string Email { get; private set; }

        private readonly List<SupportRequest> _supportRequests = new();
        public IReadOnlyCollection<SupportRequest> SupportRequests => _supportRequests;

        private readonly List<UserComment> _userComments = new();
        public IReadOnlyCollection<UserComment> UserComments => _userComments;

        public MiniUser(string username, string email, int tenantId)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new ArgumentException("Username cannot be empty");
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty");

            Username = username;
            Email = email;
            TenantId = tenantId;
        }

        public void AddComment(string comment)
        {
            if (string.IsNullOrWhiteSpace(comment))
                throw new Exception("Comment cannot be empty");

            _userComments.Add(new UserComment(comment, this.Id));
        }

       
    }
}
