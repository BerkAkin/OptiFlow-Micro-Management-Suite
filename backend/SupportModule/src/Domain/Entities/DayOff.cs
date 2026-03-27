namespace SupportModule.Domain.Entities
{
    public class DayOff
    {
        public int Id { get; private set; }
        public int TenantId { get; private set; }
        public int UserId { get; private set; }
        public MiniUser User { get; private set; }
        public string Topic { get; private set; }
        public string Description { get; private set; }
        public int Days { get; private set; }
        public DateTime StartingDate { get; private set; }
        public int Status { get; private set; } = 0;

        private DayOff() { }
        public DayOff(int tenantId,string topic, string description, int days, DateTime startingDate, int status=0) {
            TenantId = tenantId;
            Topic = topic;
            Description = description;
            Days = days;
            StartingDate = startingDate;
            Status = status;
        }

        public void ChangeStatus(int status)
        {
           Status = status;
        }

    }
}
