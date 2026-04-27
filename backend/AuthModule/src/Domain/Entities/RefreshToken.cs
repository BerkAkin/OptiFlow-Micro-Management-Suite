
namespace AuthModule.Domain.Entities
{
    public class RefreshToken
    {
        public int Id { get; private set; }
        public string Token { get; private set; }
        public DateTime Expires { get; private set; }
        public DateTime Created { get; private set; }
        public int UserId { get; private set; }
        public User User { get; private set; }

        private RefreshToken() { }

        public RefreshToken(string token, int userId)
        {
            Token = token;
            Expires = DateTime.UtcNow.AddDays(7);
            UserId = userId;
            Created = DateTime.UtcNow;
        }

        public void UpdateToken(string newToken)
        {
            Token = newToken;
            Created = DateTime.UtcNow;
            Expires = DateTime.UtcNow.AddDays(7);
        }

    }
}
