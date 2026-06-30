using ProjectMicro.Shared.Enums;

namespace SurveyModule.Domain.Entities
{
    public class Tenant
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public IsActiveEnum IsActive { get; private set; }


        private readonly List<User> _users = new();
        public IReadOnlyCollection<User> Users => _users;

        private readonly List<Survey> _surveys = new();
        public IReadOnlyCollection<Survey> Survey => _surveys;

        private Tenant() { }

        public Tenant(int id, string name)
        {
            this.Id = id;
            this.Name = name;
            this.IsActive = IsActiveEnum.Active;
        }

        public void UpdateTenantStatus()
        {
            this.IsActive = (this.IsActive == IsActiveEnum.Active)
          ? IsActiveEnum.Inactive
          : IsActiveEnum.Active;
        }

        public void AddUser(int id, string fullname)
        {
            _users.Add(new User(id, fullname, this.Id));
        }

        public Survey AddSurvey(string title)
        {
            Survey newSurvey = new Survey(this.Id, title);
            _surveys.Add(newSurvey);
            return newSurvey;
        }
    }
}
