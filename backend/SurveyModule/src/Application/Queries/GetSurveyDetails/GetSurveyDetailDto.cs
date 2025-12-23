namespace SurveyModule.Application.Queries.GetSurveyDetails
{
    public class GetSurveyDetailDto
    {
        public string Title { get; set; }
        public ICollection<GetSurveyQuestionDto> Questions { get; set; } = new List<GetSurveyQuestionDto>();
    }
}
