namespace SurveyModule.Domain.Entities
{
    public class Question
    {
        public int Id { get; private set; }
        public string Text { get; private set; }
        public int SurveyId { get; private set; }
        public Survey Survey { get; private set; }


        private readonly List<Answer> _answers = new();
        public IReadOnlyCollection<Answer> Answers => _answers;


        private Question() { }
        public Question(string text, int surveyId)
        {
            this.Text = text;
            this.SurveyId = surveyId;
        }
        public void AddAnswer(string text)
        {
            _answers.Add(new Answer(text, this.Id));
        }
    }
}
