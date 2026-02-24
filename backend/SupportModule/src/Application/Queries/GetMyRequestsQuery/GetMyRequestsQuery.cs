using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetMyRequestsQuery
{
    public record GetMyRequestsQuery(int UserId) : IRequest<List<SupportRequestsDto>>;
    public class GetMyRequestsQueryHandler : IRequestHandler<GetMyRequestsQuery,List<SupportRequestsDto>>
    {
        private readonly SupportDbContext _dbContext;
        public GetMyRequestsQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SupportRequestsDto>> Handle(GetMyRequestsQuery query,CancellationToken cancellationToken) 
        {
            return await _dbContext.SupportRequests
                .AsNoTracking()
                .Where(sr => sr.UserId == query.UserId)
                .OrderByDescending(sr => sr.CreatedAt)
                .Select(sr => new SupportRequestsDto
                {
                    Id = sr.Id,
                    IsClosed = sr.IsClosed,
                    CreatedAt = sr.CreatedAt,
                    UserName = sr.User.Username,
                    Category = sr.Category,
                })
                .ToListAsync(cancellationToken);
        }
    }
}
