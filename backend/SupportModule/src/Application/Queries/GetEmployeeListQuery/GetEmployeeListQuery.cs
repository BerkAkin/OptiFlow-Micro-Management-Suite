using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetEmployeeListQuery
{
    public record GetEmployeeListQuery(int tenantId):IRequest<List<EmployeeDto>>;
        public class GetEmployeeListQueryHandler : IRequestHandler<GetEmployeeListQuery, List<EmployeeDto>>
    {
        private readonly SupportDbContext _dbContext;
        public GetEmployeeListQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<EmployeeDto>> Handle(GetEmployeeListQuery query,CancellationToken cancellationToken)
        {
            return await _dbContext.Users
                  .AsNoTracking()
                  .Where(u => u.TenantId == query.tenantId)
                  .Select(u => new EmployeeDto
                  {
                      UserId = u.Id,
                      Username = u.Username
                  })
                  .ToListAsync(cancellationToken);
        }
    }
}
