using AuthModule.Data;
using AuthModule.DTO;
using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuthModule.Services
{
    public record GetEmployeesQuery(FilterEmployeesDto filters, int currentTenant):IRequest<(List<EmployeesDto> data, int maxPage)>;
    public class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, (List<EmployeesDto> data, int maxPage)>
    {
        private readonly AuthDBContext _context;
        public GetEmployeesQueryHandler(AuthDBContext context) { 
            _context = context;
        }

        public async Task<(List<EmployeesDto> data, int maxPage)> Handle(GetEmployeesQuery query,CancellationToken cancellationToken)
        {
            var qry = _context.Users.AsNoTracking().Where(x => x.TenantId == query.currentTenant);

            if (!string.IsNullOrWhiteSpace(query.filters.FirstName))
            {
                qry = qry.Where(x => x.Name.Contains(query.filters.FirstName));
            }
            if (!string.IsNullOrWhiteSpace(query.filters.LastName))
            {
                qry = qry.Where(x => x.Surname.Contains(query.filters.LastName));
            }

            //Sayfalama mantığının hesaplanması
            int pageSize = 10;
            int totalCount = await qry.CountAsync(cancellationToken);

            // Toplam sayfa sayısı (En az 1 sayfa dönecek şekilde)
            int maxPage = totalCount == 0 ? 1 : (int)Math.Ceiling((double)totalCount / pageSize);

            // Gelen sayfa numarasının kontrlü
            int currentPage = query.filters.Page <= 0 ? 1 : query.filters.Page;
            if (currentPage > maxPage) currentPage = maxPage;

            var data = await 
                qry.OrderByDescending(x => x.Name)
                .ThenByDescending(x=>x.Surname)
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new EmployeesDto
                {
                    Firstname = x.Name,
                    Lastname = x.Surname,
                    Phone = x.PhoneNum,
                    Email = x.Email,
                    BirthDate = x.BirthDate,
                    Department= x.Department.Name,
                    Address = $"{x.Street}, {x.Street2}, {x.ApartmentNum}, {x.DoorNumber}, {x.Province}, {x.District}",
                    IsActive = x.IsActive,

                }).ToListAsync(cancellationToken);

            return (data, maxPage);
        }
    }
}
