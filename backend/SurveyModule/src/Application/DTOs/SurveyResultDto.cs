namespace SurveyModule.Application.DTOs
{
    public class SurveyResultDto
    {
        public string Name { get; set; }
        public List<SurveyResultQuestionDto> Questions { get; set; }
    }
}
