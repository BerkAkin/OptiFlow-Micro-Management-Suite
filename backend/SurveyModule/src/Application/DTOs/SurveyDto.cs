namespace SurveyModule.Application.DTOs
{
    public class SurveyDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public List<QuestionDto> Questions { get; set; } = new();
    }
}
