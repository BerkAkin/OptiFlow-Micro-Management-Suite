
namespace AuthModule.Domain.Entities
{
    public class TenantModule
    {
        public int TenantId { get; private set; }
        public Tenant Tenant { get; private set; }

        public int ModuleId { get; private set; }
        public Module Module { get; private set; }

        private TenantModule() { } 

        public TenantModule(int tenantId, int moduleId)
        {
            TenantId = tenantId;
            ModuleId = moduleId;
        }
    }
}
