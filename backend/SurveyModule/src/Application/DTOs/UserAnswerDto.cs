namespace SurveyModule.Application.DTOs
{
    public class UserAnswerDto
    {
        public int UserId { get; set; }
        public int SurveyId { get; set; }
        public List<UserAnswerQuestionDto> Answers { get; set; }
    }
}
