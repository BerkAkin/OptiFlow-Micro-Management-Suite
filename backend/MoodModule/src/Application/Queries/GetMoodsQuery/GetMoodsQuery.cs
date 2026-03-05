using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Domain.Enums;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Queries.GetMoodsQuery
{
    public record GetMoodsQuery(int TenantId) : IRequest<List<GetMoodsDto>>;
    public class GetMoodsQueryHandler : IRequestHandler<GetMoodsQuery, List<GetMoodsDto>>
    {
        private readonly MoodDbContext _dbContext;
        public GetMoodsQueryHandler(MoodDbContext dbContext )
        {
            _dbContext = dbContext;
        }

        public async Task<List<GetMoodsDto>> Handle(GetMoodsQuery query, CancellationToken cancellationToken)
        {
            return await _dbContext.Moods
                .AsNoTracking()
                .Where(m => m.TenantId == query.TenantId)
                .Include(m => m.User)
                .OrderBy(m => m.CreatedAt)
                .Select(m => new GetMoodsDto
                {
                    CreatedAt = m.CreatedAt,
                    Employee = m.User.Username,
                    CurrentMood = (MoodEnum)m.MoodId,
                    CurrentTags = m.Tags,

                }).ToListAsync();
        }
    }
    
}
