using System.ComponentModel.DataAnnotations.Schema;

namespace AuthModule.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime DateCreate { get; set; } = DateTime.UtcNow;
        public DateTime DateUpdate { get; set; } = DateTime.UtcNow;
        public RefreshToken RefreshToken { get; set; }
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }


    }
}
