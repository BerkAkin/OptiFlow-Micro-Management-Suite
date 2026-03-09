using MoodModule.Domain.Enums;

namespace MoodModule.Domain.Entities
{
    public class MoodRecord
    {
        public int Id { get; private set; }
        public MoodEnum Mood { get; private set; }
        public List<TagsEnum> Tags { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public int TenantId { get; private set; }
        public int UserId { get; private set; }
        public MiniUser User { get; private set; }

        private MoodRecord() { }
        public MoodRecord(int UserId,int tenantId,List<TagsEnum> Tags, MoodEnum Mood)
        {
            this.Tags = Tags;
            this.Mood = Mood;
            this.UserId = UserId;
            TenantId = tenantId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
