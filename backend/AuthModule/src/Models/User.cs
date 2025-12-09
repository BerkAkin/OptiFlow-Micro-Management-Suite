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
        public string PhoneNum { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public DateTime BirthDate { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public RefreshToken RefreshToken { get; set; }
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }


    }
}
