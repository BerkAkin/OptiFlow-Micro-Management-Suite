using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Queries.GetPreviousMoodsQuery
{
    public record GetPreviousMoodsQuery(int TenantId,int UserId):IRequest<List<GetPreviousMoodsDto>>;
    public class GetPreviousMoodsQueryHandler : IRequestHandler<GetPreviousMoodsQuery, List<GetPreviousMoodsDto>>
    {
        private readonly MoodDbContext _dbContext;
        public GetPreviousMoodsQueryHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<GetPreviousMoodsDto>> Handle(GetPreviousMoodsQuery query,CancellationToken cancellationToken)
        {
            List<GetPreviousMoodsDto> data = await _dbContext.Moods
                .AsNoTracking()
                .Where(m => m.UserId == query.UserId && m.TenantId == query.TenantId)
                .OrderByDescending(m => m.CreatedAt)
                .Take(5)
                .Select(m => new GetPreviousMoodsDto
                {
                      CreatedAt = m.CreatedAt,
                      CurrentMood=m.Mood

                }).ToListAsync(cancellationToken);
            return data;
        }
    }
}
