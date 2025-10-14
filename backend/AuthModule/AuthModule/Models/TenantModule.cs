using System.ComponentModel.DataAnnotations.Schema;

namespace AuthModule.Models
{
    public class TenantModule
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }

        public int ModuleId { get; set; }
        public Module Module { get; set; }
    }
}
