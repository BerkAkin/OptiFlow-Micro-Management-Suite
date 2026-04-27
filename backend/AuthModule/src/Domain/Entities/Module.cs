namespace AuthModule.Domain.Entities
{
    public class Module
    {
        public int Id { get;  private set; }
        public string Name { get;  private set; }
        public ICollection<TenantModule> TenantModules { get; private set; }

        private Module() { }

        public Module(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Module name cannot be null.");

            Name = name;
        }
    }
}
