using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetMyDayOffListQuery
{
    public record GetMyDayOffListQuery(int currentTenant,int currentUser) : IRequest<List<DayOffDto>>;
    public class GetMyDayOffListQueryHandler : IRequestHandler<GetMyDayOffListQuery, List<DayOffDto>>
    {
        private readonly SupportDbContext _dbContext;

        public GetMyDayOffListQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<DayOffDto>> Handle(GetMyDayOffListQuery query, CancellationToken cancellationToken)
        {
            return await _dbContext.DayOffs.AsNoTracking()
                .Where(d => d.TenantId == query.currentTenant && d.UserId==query.currentUser)
                .Select(d => new DayOffDto
                {
                    Topic = d.Topic,
                    Description = d.Description,
                    StartingDate = d.StartingDate,
                    Days = d.Days,
                    Status = d.Status,
                })
                .ToListAsync();

        }


    }


}
