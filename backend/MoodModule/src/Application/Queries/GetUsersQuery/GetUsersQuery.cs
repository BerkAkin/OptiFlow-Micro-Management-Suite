using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Queries.GetUsersQuery
{
    public record GetUsersQuery(int TenantId) : IRequest<List<GetUsersDto>>;
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, List<GetUsersDto>>
    {
        private readonly MoodDbContext _dbContext;
        public GetUsersQueryHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<GetUsersDto>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
        {
            return await _dbContext.Users
                .AsNoTracking()
                .Where(u => u.TenantId == query.TenantId)
                .Select(u=> new GetUsersDto
                {
                    UserId = u.Id,
                    Employee= u.Username,
                })
                .ToListAsync();
        }
    }
}
