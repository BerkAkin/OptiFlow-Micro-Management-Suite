using System.ComponentModel.DataAnnotations.Schema;

namespace AuthModule.Models
{
    public class Tenant
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<TenantModule> TenantModules { get; set; }
    }
}
