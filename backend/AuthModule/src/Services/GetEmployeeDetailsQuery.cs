using AuthModule.Data;
using AuthModule.DTO;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Services
{
    public record GetEmployeeDetailsQuery(string email,int currentTenant) : IRequest<EmployeeDetailsDto>;
    public class GetEmployeeDetailsQueryHandler : IRequestHandler<GetEmployeeDetailsQuery,EmployeeDetailsDto>
    {
        private readonly AuthDBContext _context;
        public GetEmployeeDetailsQueryHandler(AuthDBContext context)
        {
            _context = context;
        }
        
        public async Task<EmployeeDetailsDto> Handle(GetEmployeeDetailsQuery query, CancellationToken cancellationToken)
        {
            var data = await _context.Users
               .AsNoTracking()
               .Where(u => u.Email == query.email && u.TenantId == query.currentTenant)
               .Select(x => new EmployeeDetailsDto
               {
                   Email=x.Email,
                   Department = x.DepartmentId,
                   IsActive= x.IsActive,
               }).FirstOrDefaultAsync(cancellationToken);

            return data;
        }
    }
}
