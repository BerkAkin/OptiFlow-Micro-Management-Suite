using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetMonthlyRequestCountsQuery
{
    public record GetMonthlyRequestCountsQuery(int tenantId):IRequest<List<MonthlyRequestsCountDto>>;
    
    public class GetMonthlyRequestCountsQueryHandler: IRequestHandler<GetMonthlyRequestCountsQuery, List<MonthlyRequestsCountDto>>
    {
        private readonly SupportDbContext _dbContext;
        public GetMonthlyRequestCountsQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<MonthlyRequestsCountDto>> Handle(GetMonthlyRequestCountsQuery query, CancellationToken cancellationToken)
        {
            var year = DateTime.UtcNow.Year;

            return await _dbContext.SupportRequests
                .AsNoTracking()
                .Where(sr => sr.CreatedAt.Year == year && sr.TenantId== query.tenantId)
                .GroupBy(sr => sr.CreatedAt.Month)
                .Select(g => new MonthlyRequestsCountDto
                {
                    Month = g.Key,
                    Count = g.Count()
                })
                .OrderBy(x => x.Month)
                .ToListAsync(cancellationToken);

        }
    }
}
