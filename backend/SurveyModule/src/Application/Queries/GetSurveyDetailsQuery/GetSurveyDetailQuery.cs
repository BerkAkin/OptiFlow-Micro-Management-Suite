using MediatR;
using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.DTOs;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Application.Queries.GetSurveyDetailsQuery
{
    public record GetSurveyDetailQuery(int SurveyId, int tenantId, int UserId) : IRequest<SurveyDto>;
    public class GetSurveyDetailHandler : IRequestHandler<GetSurveyDetailQuery, SurveyDto>
    {
        private readonly SurveyDbContext _context;
        public GetSurveyDetailHandler(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task<SurveyDto> Handle(GetSurveyDetailQuery request, CancellationToken cancellationToken)
        {

            var result = await _context.Surveys
                .AsNoTracking()
                .Where(x => x.Id == request.SurveyId && x.TenantId == request.tenantId)
                .Select(x => new SurveyDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Questions = x.Questions.Select(q => new QuestionDto
                    {
                        Id = q.Id,
                        Title = q.Text,
                        Answers = q.Answers.Select(a => new AnswerDto
                        {
                            Id = a.Id,
                            Title = a.Text,
                        }).ToList()
                    }).ToList()
                }).SingleOrDefaultAsync(cancellationToken);

            if (result == null)
            {
                throw new KeyNotFoundException("No survey found");
            }

            return result;

        }
    }
}
