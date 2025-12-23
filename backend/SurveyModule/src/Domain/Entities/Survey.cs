using SurveyModule.Domain.Enums;

namespace SurveyModule.Domain.Entities
{
    public class Survey
    {
        public int Id { get; set; }
        public int CreatorId { get; set; }
        public int TenantId { get; set; }
        public string Title { get; set; }
        public SurveyStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
