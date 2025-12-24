namespace SurveyModule.Application.DTOs
{
    public class SurveyResultQuestionDto
    {
        public int Id { get; set; }
        public List<SurveyResultQuestionAnswerDto> Answers { get; set; }
    }
}
