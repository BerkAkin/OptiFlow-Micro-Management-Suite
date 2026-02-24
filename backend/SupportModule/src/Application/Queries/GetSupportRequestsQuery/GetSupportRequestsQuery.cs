using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetSupportRequestsQuery
{
    public record GetSupportRequestsQuery(int TenantId):IRequest<List<SupportRequestsDto>>;
    
    public class GetSupportRequestsQueryHandler: IRequestHandler<GetSupportRequestsQuery , List<SupportRequestsDto>>
    {
        private readonly SupportDbContext _dbContext ;
        public GetSupportRequestsQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SupportRequestsDto>> Handle(GetSupportRequestsQuery query, CancellationToken cancellationToken)
        {
            return await _dbContext.SupportRequests
                .AsNoTracking()
                .Where(sr => sr.TenantId == query.TenantId)
                .OrderByDescending(sr => sr.CreatedAt)
                .Select(sr => new SupportRequestsDto
                {
                    CreatedAt = sr.CreatedAt,
                    Id = sr.Id,
                    IsClosed = sr.IsClosed,
                    UserName = sr.User.Username,
                    Category = sr.Category,
                })
                .ToListAsync(cancellationToken);
        }

      
    }
}
