using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Domain.Enums;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Queries.GetMoodsQuery
{
    public record GetMoodsQuery(int TenantId,int UserId,int DepartmentId, MoodFilterDto filters) : IRequest<(List<GetMoodsDto>,int maxPage)>;
    public class GetMoodsQueryHandler : IRequestHandler<GetMoodsQuery, (List<GetMoodsDto>,int maxPage)>
    {
        private readonly MoodDbContext _dbContext;
        public GetMoodsQueryHandler(MoodDbContext dbContext )
        {
            _dbContext = dbContext;
        }

        public async Task<(List<GetMoodsDto>, int maxPage)> Handle(GetMoodsQuery query, CancellationToken cancellationToken)
        {
            var qry = _dbContext.Moods.AsNoTracking().Where(m => m.TenantId == query.TenantId);

            if(query.DepartmentId != (int)DepartmentsEnum.HR)
            {
                qry=qry.Where(m=>m.UserId == query.UserId);
            }

            if (Enum.TryParse<MoodEnum>(query.filters.Mood, out var moodEnum))
            {
                qry = qry.Where(x => x.Mood == moodEnum);
            }

            if (!string.IsNullOrEmpty(query.filters.Date) && DateTime.TryParse(query.filters.Date, out DateTime parsedDate))
            {
                var nextDay = parsedDate.AddDays(1);
                qry = qry.Where(x => x.CreatedAt >= parsedDate && x.CreatedAt < nextDay);
            }


            int pageSize = 8;
            int page = query.filters.Page <= 0 ? 1 : query.filters.Page;

            int totalCount = await qry.CountAsync(cancellationToken);
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);
            if (maxPage == 0) maxPage = 1;

            var rawData = await qry
            .OrderByDescending(x => x.CreatedAt)
            .Skip((page - 1) * pageSize)
             .Take(pageSize)
            .Select(m => new
            {
                m.CreatedAt,
                Username = m.User.Username,
                m.Mood,
                m.Tags 
            }) 
            .ToListAsync(cancellationToken);

            var result = rawData.Select(m => new GetMoodsDto
            {
                Date = m.CreatedAt,
                Employee = m.Username,
                Mood = m.Mood.ToString(),
                Tags = m.Tags.Select(t => t.ToString()).ToList()
            }).ToList();

            return (result, maxPage);
        }
    }
    
}
