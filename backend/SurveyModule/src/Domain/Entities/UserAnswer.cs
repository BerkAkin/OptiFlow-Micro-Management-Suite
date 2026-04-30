namespace SurveyModule.Domain.Entities
{
    public class UserAnswer
    {
        public int Id { get; set; }

        public int TenantId { get; set; }
        public User Tenant { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int SurveyId { get; set; }
        public Survey Survey { get; set; }

        public int QuestionId { get; set; }
        public Question Question { get; set; }

        public int AnswerId { get; set; }
        public Answer Answer { get; set; }

        public DateTime CreatedAt { get; set; }

        private UserAnswer() { }
        public UserAnswer(int tenantId, int userId, int surveyId, int questionId, int answerId)
        {
            this.TenantId = tenantId;
            this.UserId = userId;
            this.SurveyId = surveyId;
            this.QuestionId = questionId;
            this.AnswerId = answerId;
            this.CreatedAt = DateTime.UtcNow;
        }

    }
}
