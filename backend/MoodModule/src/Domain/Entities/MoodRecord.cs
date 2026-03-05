using MoodModule.Domain.Enums;

namespace MoodModule.Domain.Entities
{
    public class MoodRecord
    {
        public int Id { get; private set; }
        public int MoodId { get; private set; }
        public List<TagsEnum> Tags { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public int TenantId { get; private set; }
        public int UserId { get; private set; }
        public MiniUser User { get; private set; }

        private MoodRecord() { }
        public MoodRecord(int UserId,int tenantId,List<TagsEnum> Tags, int MoodId)
        {
            this.Tags = Tags;
            this.MoodId = MoodId;
            this.UserId = UserId;
            TenantId = tenantId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
