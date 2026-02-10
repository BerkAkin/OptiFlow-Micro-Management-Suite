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
                Date= x.CreatedAt,
                Status= x.Status,
                SatisfactionCount= x.SatisfactionRate.Count(x=>x.Satisfaction == Domain.Enums.SatisfactionStatus.Liked),
                DissatisfactionCount= x.SatisfactionRate.Count(x=>x.Satisfaction == Domain.Enums.SatisfactionStatus.Disliked),

            }).ToListAsync();
        }

        public async Task<SurveyDto> GetSurveyDetail(int SurveyId,int tenantId, int UserId)
        {
            var userAnswer = await _context.UserAnswers.Where(x => x.UserId == UserId && x.SurveyId==SurveyId).AnyAsync();
            if (userAnswer)
                throw new InvalidOperationException("User is already took the survey");

            return await _context.Surveys.AsNoTracking().Where(x => x.Id == SurveyId && x.TenantId== tenantId).Select(x => new SurveyDto
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
           var questions = await _context.UserAnswers.Where(x => x.SurveyId == SurveyId)

            .Join(_context.Questions,
                userAnswer=>userAnswer.QuestionId, 
                question => question.Id,
                (userAnswer,question)=> new {userAnswer,question}
            )
            .Join(_context.Answers,
                combined => combined.userAnswer.AnswerId,
                answer => answer.Id,
                (combined,answer)=> new {
                    questionId= combined.question.Id,
                    answerId= answer.Id,
                    questionTitle=combined.question.Title,
                    answerTitle=answer.Title,
                })
            .GroupBy(x=>x.questionId)
            .Select(questionGroup => new SurveyResultQuestionDto
            {
                Title= questionGroup.First().questionTitle,
                Answers= questionGroup
                .GroupBy(x=>x.answerId)
                .Select(answerGroup=> new SurveyResultQuestionAnswerDto
                {
                    Title= answerGroup.First().answerTitle,
                    Count= answerGroup.Count()
                }).ToList()
            }).ToListAsync();

            var SurveyName = await _context.Surveys.Where(x => x.Id == SurveyId).Select(x => x.Title).FirstAsync();

            return new SurveyResultDto
            {
                Questions = questions,
                Name = SurveyName

            };

        }

        public async Task AddSatisfaction(SatisfactionRate satisfaction)
        {
            var userSatisfaction = await _context.SatisfactionRates.Where(x=>x.UserId== satisfaction.UserId && x.SurveyId== satisfaction.SurveyId).AnyAsync();
            if (userSatisfaction)
                throw new InvalidOperationException("You already rated the survey");

            await _context.SatisfactionRates.AddAsync(satisfaction);
            await _context.SaveChangesAsync();
        }
    }
}
