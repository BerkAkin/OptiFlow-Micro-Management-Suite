using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Application.Queries.GetSurveyDetails;
using SurveyModule.Application.Queries.GetSurveys;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Infrastructure.Repositories
{
    public class SurveysRepository: ISurveyRepository
    {
        private readonly SurveyDbContext _context;
        public SurveysRepository(SurveyDbContext context)
        {
            _context= context;
        }
         
        public async Task<List<GetSurveyDto>> GetSurveyList(int TenantId)
        {
            return await _context.Surveys.Where(x => x.TenantId == TenantId).Select(x => new GetSurveyDto
            {
                Title = x.Title,
                TenantId = x.TenantId,  
                Id=x.Id,
                Date= x.CreatedAt

            }).ToListAsync();
        }

        public async Task<GetSurveyDetailDto> GetSurveyDetail(int SurveyId)
        {
            return await _context.Surveys.Where(x => x.Id == SurveyId).Select(x => new GetSurveyDetailDto
            {
                Title= x.Title,
                Questions= x.Questions.Select(q=> new GetSurveyQuestionDto
                {
                    Id=q.Id,
                    Title= q.Title,
                    Answers = q.Answers.Select(a=> new GetSurveyQuestionAnswerDto
                    {
                        Id=a.Id,    
                        Title= a.Title,
                    }).ToList()   
                }).ToList()
            }).SingleOrDefaultAsync();
        }
    }
}
