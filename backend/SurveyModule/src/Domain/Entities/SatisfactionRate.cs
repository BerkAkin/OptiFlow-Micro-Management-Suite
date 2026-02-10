using SurveyModule.Domain.Enums;

namespace SurveyModule.Domain.Entities
{
    public class SatisfactionRate
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SurveyId { get; set; }
        public Survey Survey { get; set; }
        public SatisfactionStatus Satisfaction { get; set; }
    }
}
