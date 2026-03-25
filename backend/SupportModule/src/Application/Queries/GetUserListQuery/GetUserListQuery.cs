using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Domain.Enums;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetUserListQuery
{
    public record GetUserListQuery(int tenantId,int departmentId,int userId): IRequest<List<UserDto>>;
    public class GetUserListQueryHandler : IRequestHandler<GetUserListQuery, List<UserDto>>
    {
        private readonly SupportDbContext _context;
        public GetUserListQueryHandler(SupportDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> Handle(GetUserListQuery query, CancellationToken cancellationToken)
        {
            var qry = _context.Users
                .AsNoTracking()
                .Where(u => u.TenantId == query.tenantId);

            if (query.departmentId!=(int)DepartmentsEnum.HR) {
                qry = qry.Where(u=>u.DepartmentId == (int)DepartmentsEnum.HR);
            }

            return await qry.Select(u => new UserDto 
            {
               Id = u.Id,
               Name = u.Username
                 
            })
            .ToListAsync(cancellationToken);
            
               
        }
    }
}
