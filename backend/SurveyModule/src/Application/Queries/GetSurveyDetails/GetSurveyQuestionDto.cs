namespace SurveyModule.Application.Queries.GetSurveyDetails
{
    public class GetSurveyQuestionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<GetSurveyQuestionAnswerDto> Answers { get; set; } = new List<GetSurveyQuestionAnswerDto>();
    }
}
