namespace SurveyModule.Infrastructure.Security
{
    public class CurrentUser
    {
        public int UserId { get; set; }
        public int TenantId { get; set; }
        public string Email { get; set; }
    }
}
