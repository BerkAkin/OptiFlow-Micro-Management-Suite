using MediatR;
using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.DTOs;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Application.Queries.GetSurveysQuery
{
    public record GetSurveyQuery(int TenantId) : IRequest<List<GetSurveyDto>>;
    public class GetSurveyQueryHandler : IRequestHandler<GetSurveyQuery, List<GetSurveyDto>>
    {
        private readonly SurveyDbContext _context;
        public GetSurveyQueryHandler(SurveyDbContext context)
        {
            _context = context;
        }
        public async Task<List<GetSurveyDto>> Handle(GetSurveyQuery request, CancellationToken cancellationToken)
        {
            return await _context.Surveys
                .AsNoTracking()
                .Where(x => x.TenantId == request.TenantId)
                .Select(x => new GetSurveyDto
                {
                    Title = x.Title,
                    TenantId = x.TenantId,
                    Id = x.Id,
                    Date = x.CreatedAt,
                    Status = x.Status,
                    SatisfactionCount = x.SatisfactionRate,
                    ParticipateCount = x.ParticipationRate,
                }).ToListAsync();
        }
    }
}
