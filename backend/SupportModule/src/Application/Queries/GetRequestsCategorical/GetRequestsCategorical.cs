using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetRequestsCategorical
{
    public record GetRequestsCategoricalQuery(int TenantId): IRequest<List<CategoricalRequestDto>>;
    public class GetRequestsCategoricalHandler : IRequestHandler<GetRequestsCategoricalQuery, List<CategoricalRequestDto>>
    {
        private readonly SupportDbContext _dbContext;
        public GetRequestsCategoricalHandler(SupportDbContext dbContext) {

            _dbContext = dbContext;
        }

        public async Task<List<CategoricalRequestDto>> Handle(GetRequestsCategoricalQuery query, CancellationToken cancellationToken)
        {
            int currentYear = DateTime.Now.Year;
            return await _dbContext.SupportRequests
                .AsNoTracking()
                .Where(rc => rc.TenantId == query.TenantId && rc.CreatedAt.Year == currentYear)
                .GroupBy(rc => rc.Category)
                .Select(grc => new CategoricalRequestDto
                {
                    Category = grc.Key,
                    Count = grc.Count()
                })
                .ToListAsync(cancellationToken);

        }
    }
}
