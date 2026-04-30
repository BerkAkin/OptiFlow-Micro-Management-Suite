using SurveyModule.Domain.Enums;

namespace SurveyModule.Domain.Entities
{
    public class Survey
    {
        public int Id { get; private set; }
        public string Title { get; private set; }

        public int ParticipationRate { get; set; } = 0;
        public int SatisfactionRate { get; set; } = 0;
        public SurveyStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

        public Tenant Tenant { get; private set; }
        public int TenantId { get; private set; }


        private readonly List<Question> _questions = new();
        public IReadOnlyCollection<Question> Questions => _questions;


        private Survey() { }

        public Survey(int tenantId, string title)
        {
            this.TenantId = tenantId;
            this.Title = title;
            this.Status = SurveyStatus.Published;
        }

        public Question AddQuestion(string text)
        {
            Question newQuestion = new Question(text, this.Id);
            _questions.Add(newQuestion);
            return newQuestion;
        }

        public void IncreaseSatisfaction()
        {
            this.SatisfactionRate++;
            this.ParticipationRate++;

        }
        public void ReduceSatisfaction()
        {
            this.SatisfactionRate--;
            this.ParticipationRate++;

        }
    }
}
