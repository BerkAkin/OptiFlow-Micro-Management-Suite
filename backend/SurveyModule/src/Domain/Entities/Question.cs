namespace SurveyModule.Domain.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Answer> Answers { get; set; } = new List<Answer>();

        public int SurveyId { get; set; }
        public Survey Survey { get; set; }
    }
}
