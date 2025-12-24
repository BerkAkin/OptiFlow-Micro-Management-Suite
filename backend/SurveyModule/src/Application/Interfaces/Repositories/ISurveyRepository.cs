using SurveyModule.Application.DTOs;
using SurveyModule.Domain.Entities;

namespace SurveyModule.Application.Interfaces.Repositories
{
    public interface ISurveyRepository
    {
        Task<List<GetSurveyDto>> GetSurveyList(int TenantId);
        Task<SurveyDto> GetSurveyDetail(int SurveyId);
        Task<SurveyResultDto> GetSurveyResult(int SurveyId);
        Task AddSurvey(Survey survey);
        Task AnswerSurvey(List<UserAnswer> UserAnswer);
    }
}
