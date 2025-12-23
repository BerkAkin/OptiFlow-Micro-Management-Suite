namespace SurveyModule.Application.Queries.GetSurveys
{
    public class GetSurveyDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
    }
}
