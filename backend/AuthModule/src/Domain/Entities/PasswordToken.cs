
namespace AuthModule.Domain.Entities
{
    public class PasswordToken
    {
        public int Id { get; private set; }
        public int UserId { get; private set; }
        public User User { get; private set; }
        public string? ResetToken { get; private set; }
        public DateTime? Expires { get; private set; }
        public DateTime Created { get; private set; }

        private PasswordToken() { }

        public PasswordToken(string token, int userId)
        {
            ResetToken = token;
            Expires = DateTime.UtcNow.AddMinutes(15);
            UserId = userId;
            Created = DateTime.UtcNow;
        }

        public void UpdatePasswordToken(string newToken)
        {
            ResetToken = newToken;
            Created = DateTime.UtcNow;
            Expires = DateTime.UtcNow.AddMinutes(15);
        }

        public void ClearToken()
        {
            this.ResetToken = null;
            this.Expires = null;
        }
    }
}
