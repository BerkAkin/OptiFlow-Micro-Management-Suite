namespace SurveyModule.Application.DTOs
{
    public class SurveyResultQuestionDto
    {
        public string Title { get; set; }
        public List<SurveyResultQuestionAnswerDto> Answers { get; set; }
    }
}
