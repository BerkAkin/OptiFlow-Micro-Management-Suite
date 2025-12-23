using SurveyModule.Domain.Enums;

namespace SurveyModule.Domain.Entities
{
    public class Survey
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public int TenantId { get; set; }
        public string Title { get; set; }
        public SurveyStatus Status { get; set; } = SurveyStatus.Published;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
