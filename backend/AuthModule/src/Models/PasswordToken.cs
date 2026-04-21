namespace AuthModule.Models
{
    public class PasswordToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? ExpireDate { get; set; }
    }
}
