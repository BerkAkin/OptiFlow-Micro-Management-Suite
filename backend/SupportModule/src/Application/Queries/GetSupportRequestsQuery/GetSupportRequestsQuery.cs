using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Domain.Enums;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetSupportRequestsQuery
{
    public record GetSupportRequestsQuery(int TenantId,int DepartmentId,int currentUser):IRequest<List<SupportRequestsDto>>;
    
    public class GetSupportRequestsQueryHandler: IRequestHandler<GetSupportRequestsQuery , List<SupportRequestsDto>>
    {
        private readonly SupportDbContext _dbContext ;
        public GetSupportRequestsQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SupportRequestsDto>> Handle(GetSupportRequestsQuery query, CancellationToken cancellationToken)
        {
            var qry =  _dbContext.SupportRequests
                 .AsNoTracking()
                 .Where(sr => sr.TenantId == query.TenantId);
               
            if (query.DepartmentId != (int)DepartmentsEnum.HR)
            {
                qry = qry.Where(x => x.UserId == query.currentUser);
            } 

            return await qry.OrderByDescending(sr => sr.CreatedAt)
                .Select(sr => new SupportRequestsDto
                {
                    CreatedAt = sr.CreatedAt,
                    Id = sr.Id,
                    IsClosed = sr.IsClosed,
                    UserName = sr.User.Username,
                    Category = sr.Category,
                }).ToListAsync(cancellationToken);
            
        }

      
    }
}
