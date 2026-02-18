namespace SupportModule.Domain.Entities
{
    public class MiniUser
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public List<SupportRequest> SupportRequest { get; set; }
        public List<UserComment> UserComments { get; set; }
    }
}
