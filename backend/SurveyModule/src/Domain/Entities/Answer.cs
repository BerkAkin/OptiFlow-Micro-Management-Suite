namespace SurveyModule.Domain.Entities
{
    public class Answer
    {
        public int Id { get; private set; }
        public string Text { get; private set; }
        public int QuestionId { get; private set; }
        public Question Question { get; private set; }

        private Answer() { }

        public Answer(string text, int questionId)
        {
            this.Text = text;
            this.QuestionId = questionId;
        }

    }
}
