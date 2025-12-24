namespace SurveyModule.Application.DTOs
{
    public class GetSurveyDto
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
    }
}
