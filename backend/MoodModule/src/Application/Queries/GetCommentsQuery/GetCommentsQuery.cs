using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Queries.GetCommentsQuery
{
    public record GetCommentsQuery(int UserId) : IRequest<List<GetCommentsDto>>;
    public class GetCommentsQueryHandler : IRequestHandler<GetCommentsQuery, List<GetCommentsDto>>
    {
        private readonly MoodDbContext _dbContext;
        public GetCommentsQueryHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<GetCommentsDto>> Handle(GetCommentsQuery query, CancellationToken cancellationToken)
        {
            return await _dbContext.Comments
               .AsNoTracking()
               .Where(c => c.UserId == query.UserId)
               .OrderByDescending(c => c.CreatedAt)
               .Select(c => new GetCommentsDto
               {
                   Comment = c.Content,
                   Date = c.CreatedAt.Date,
               })
               .ToListAsync();
        }
    }
}
