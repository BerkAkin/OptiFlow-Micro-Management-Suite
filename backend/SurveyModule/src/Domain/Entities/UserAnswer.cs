namespace SurveyModule.Domain.Entities
{
    public class UserAnswer
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MiniUser User { get; set; }
        public int SurveyId { get; set; }
        public Survey Survey { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public int AnswerId { get; set; }
        public Answer Answer { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
