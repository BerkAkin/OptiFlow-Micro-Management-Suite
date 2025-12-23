using SurveyModule.Application.Queries.GetSurveyDetails;
using SurveyModule.Application.Queries.GetSurveys;

namespace SurveyModule.Application.Interfaces.Repositories
{
    public interface ISurveyRepository
    {
        Task<List<GetSurveyDto>> GetSurveyList(int TenantId);
        Task<GetSurveyDetailDto> GetSurveyDetail(int SurveyId);
    }
}
