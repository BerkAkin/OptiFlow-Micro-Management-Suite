using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Queries.GetAllCommentsQuery
{
    public record GetAllCommentsQuery(int UserId):IRequest<List<GetAllCommentsDto>>;
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, List<GetAllCommentsDto>>
    {
        private readonly MoodDbContext _dbContext;
        public GetAllCommentsQueryHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<GetAllCommentsDto>> Handle(GetAllCommentsQuery query, CancellationToken cancellationToken)
        {
            return await _dbContext.Comments
                .AsNoTracking()
                .Where(c => c.UserId == query.UserId)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new GetAllCommentsDto { 
                    Id=c.Id,
                    Content=c.Content,
                    CreatedAt=c.CreatedAt,
                })
                .ToListAsync();
        }
    }
}
