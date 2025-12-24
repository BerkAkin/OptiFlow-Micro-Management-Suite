namespace SurveyModule.Application.DTOs
{
    public class SurveyResultDto
    {
        public int Id { get; set; }
        public List<SurveyResultQuestionDto> Questions { get; set; }
    }
}
