namespace SurveyModule.Application.DTOs
{
    public class QuestionDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public List<AnswerDto> Answers { get; set; } = new ();
    }
}
