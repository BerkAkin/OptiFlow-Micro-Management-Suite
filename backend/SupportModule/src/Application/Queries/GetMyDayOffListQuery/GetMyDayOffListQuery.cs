using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SupportModule.Application.Queries.GetMyDayOffListQuery
{
    public record GetMyDayOffListQuery(int currentTenant,int currentUser, MyDaysOffFilterDto filters) : IRequest<(List<DayOffDto> data, int maxPage)>;
    public class GetMyDayOffListQueryHandler : IRequestHandler<GetMyDayOffListQuery, (List<DayOffDto> data, int maxPage)>
    {
        private readonly SupportDbContext _dbContext;

        public GetMyDayOffListQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<(List<DayOffDto> data , int maxPage)> Handle(GetMyDayOffListQuery query, CancellationToken cancellationToken)
        {

            var qry = _dbContext.DayOffs
                .AsNoTracking()
                .Where(d => d.TenantId == query.currentTenant && d.UserId == query.currentUser);


            if (!string.IsNullOrEmpty(query.filters.Topic))
            {
                qry = qry.Where(x => x.Topic.Contains(query.filters.Topic));
            }
            if (!string.IsNullOrEmpty(query.filters.Date) && DateTime.TryParse(query.filters.Date, out DateTime parsedDate))
            {
                qry = qry.Where(x => x.StartingDate.Date == parsedDate.Date);
            }

            int pageSize = 10;
            int page = query.filters.Page <= 0 ? 1 : query.filters.Page;
            int totalCount = await qry.CountAsync();
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);
            if (maxPage == 0) maxPage = 1;


            var data = await qry.OrderByDescending(x=>x.StartingDate)
                .Skip((query.filters.Page - 1) * pageSize)
                .Take(pageSize)
                .Select(d => new DayOffDto
                {
                    Topic = d.Topic,
                    Description = d.Description,
                    StartingDate = d.StartingDate,
                    Days = d.Days,
                    Status = d.Status,
                })
                .ToListAsync();

            return (data, maxPage);


        }


    }


}
