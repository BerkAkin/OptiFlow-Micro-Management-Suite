namespace SurveyModule.Domain.Entities
{
    public class MiniUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public List<UserAnswer> UserAnswers { get; set; } = new List<UserAnswer>();


    }
}
