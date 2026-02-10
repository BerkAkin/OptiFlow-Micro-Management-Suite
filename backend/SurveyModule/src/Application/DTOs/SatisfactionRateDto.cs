using SurveyModule.Domain.Enums;

namespace SurveyModule.Application.DTOs
{
    public class SatisfactionRateDto
    {
        public int SurveyId { get; set; }
        public SatisfactionStatus Satisfaction { get; set; }
    }
}
