using MediatR;
using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.DTOs;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Application.Queries.GetSurveyResult
{
    public record GetSurveyResultQuery(int SurveyId) : IRequest<SurveyResultDto>;
    public class GetSurveyResultQueryHandler : IRequestHandler<GetSurveyResultQuery, SurveyResultDto>
    {
        private readonly SurveyDbContext _context;
        public GetSurveyResultQueryHandler(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task<SurveyResultDto> Handle(GetSurveyResultQuery request, CancellationToken cancellationToken)
        {
            var answers = await _context.Surveys
                .AsNoTracking()
                .Where(x => x.Id == request.SurveyId)
                .Select(s => new SurveyResultDto
                {
                    Name = s.Title,
                    Questions = s.Questions.Select(q => new SurveyResultQuestionDto
                    {
                        Title = q.Text,
                        Answers = q.Answers.Select(a => new SurveyResultQuestionAnswerDto
                        {
                            Title = q.Text,
                            Count = _context.UserAnswers.Count(ua => ua.AnswerId == a.Id),
                        }).ToList(),
                    }).ToList(),
                }).SingleOrDefaultAsync(cancellationToken);

            if (answers == null)
                throw new KeyNotFoundException("No survey has been found.");

            return answers;

        }
    }
}
