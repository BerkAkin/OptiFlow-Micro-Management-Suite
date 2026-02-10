namespace SurveyModule.Infrastructure.Security
{
    public interface ICurrentUserService
    {
        CurrentUser User { get; }
    }
}
