using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Domain.Entities;
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
            return await _context.Surveys.AsNoTracking().Where(x => x.TenantId == TenantId).Select(x => new GetSurveyDto
            {
                Title = x.Title,
                TenantId = x.TenantId,  
                Id=x.Id,
                Date= x.CreatedAt

            }).ToListAsync();
        }

        public async Task<SurveyDto> GetSurveyDetail(int SurveyId)
        {
            return await _context.Surveys.AsNoTracking().Where(x => x.Id == SurveyId).Select(x => new SurveyDto
            {
                Id= x.Id,
                Title= x.Title,
                Questions= x.Questions.Select(q=> new QuestionDto
                {
                    Id=q.Id,
                    Title= q.Title,
                    Answers = q.Answers.Select(a=> new AnswerDto
                    {
                        Id=a.Id,    
                        Title= a.Title,
                    }).ToList()   
                }).ToList()
            }).SingleOrDefaultAsync();
        }

        public async Task AddSurvey(Survey survey)
        {

            await _context.Surveys.AddAsync(survey);
            await _context.SaveChangesAsync();
        }

        public async Task AnswerSurvey(List<UserAnswer> UserAnswer)
        {
            var userId = UserAnswer.First().UserId;
            var surveyId = UserAnswer.First().SurveyId;
            var alreadyAnswered = await _context.UserAnswers.AnyAsync(x => x.UserId == userId && x.SurveyId == surveyId);
            if (alreadyAnswered)
                throw new InvalidOperationException("Bu kullanıcı ankete daha önce katılmış.");

            await _context.UserAnswers.AddRangeAsync(UserAnswer);
            await _context.SaveChangesAsync();
        }

        public async Task<SurveyResultDto> GetSurveyResult(int SurveyId)
        {
            var answers = await _context.UserAnswers
                .Where(x => x.SurveyId == SurveyId)
                .ToListAsync();

            var result = new SurveyResultDto
            {
                Id = SurveyId,
                Questions = answers
                .GroupBy(x => x.QuestionId)
                .Select(questionGroup => new SurveyResultQuestionDto
                {
                    Id = questionGroup.Key,
                    Answers = questionGroup
                    .GroupBy(x => x.AnswerId)
                    .Select(answerGroup => new SurveyResultQuestionAnswerDto
                    {
                        Id = answerGroup.Key,
                        Percent = (int)Math.Round((double)answerGroup.Count() * 100 / questionGroup.Count())
                    }).ToList()
                }).ToList()
            };


            return result;
                
        }

    }
}
