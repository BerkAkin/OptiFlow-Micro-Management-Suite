namespace SurveyModule.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string Fullname { get; private set; }

        public Tenant Tenant { get; private set; }
        public int TenantId { get; private set; }

        private User() { }
        public User(int id, string fullname, int tenantId)
        {
            this.Id = id;
            this.Fullname = fullname;
            this.TenantId = tenantId;
        }


    }
}
