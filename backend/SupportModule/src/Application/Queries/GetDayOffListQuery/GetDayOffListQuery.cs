using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetDayOffListQuery
{
    public record GetDayOffListQuery(int currentTenant):IRequest<List<DayOffDto>>;
    public class GetDayOffListQueryHandler : IRequestHandler<GetDayOffListQuery,List<DayOffDto>>
    {
        private readonly SupportDbContext _dbContext;

        public GetDayOffListQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<DayOffDto>> Handle(GetDayOffListQuery query,CancellationToken cancellationToken) 
        { 
            return await _dbContext.DayOffs.AsNoTracking()
                .Where(d=>d.TenantId==query.currentTenant)
                .Select(d=>new DayOffDto{
                       Id=d.Id,
                       Username=d.User.Username,
                       Topic=d.Topic,
                       Description=d.Description,
                       StartingDate=d.StartingDate,
                       Days = d.Days,
                       Status=d.Status,
                })
                .ToListAsync();

        }

   
    }
    
    
}
