using SurveyModule.Domain.Enums;

namespace SurveyModule.Application.DTOs
{
    public class GetSurveyDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public SurveyStatus Status { get; set; }

        public int SatisfactionCount { get; set; }
        public int DissatisfactionCount { get; set; }
    }
}
