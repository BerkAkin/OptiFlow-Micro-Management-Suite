using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{

    public record InstallmentsQuery(InstallRecurFilterDTO filters) : IRequest<(List<InstallmentsDTO> data, int maxPage)>;

    public class InstallementsQueryHandler : IRequestHandler<InstallmentsQuery, (List<InstallmentsDTO> data, int maxPage)>
    {

        private readonly FinanceDBContext _context;

        public InstallementsQueryHandler(FinanceDBContext context) {
            _context = context;
        }

        public async Task<(List<InstallmentsDTO>data,int maxPage)> Handle(InstallmentsQuery request, CancellationToken cancellationToken)
        {
           const int pageSize = 10;

            var query = _context.Transactions
                .AsNoTracking()
                .Where(x => x.IsPartly && !x.IsIncome);

            if (!string.IsNullOrEmpty(request.filters.Description))
            {
                query = query.Where(x => x.Description.Contains(request.filters.Description));
            }

            int totalCount = await query.CountAsync();
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);

            var data = await query
                .OrderByDescending(o => o.Date)
                .Skip((request.filters.Page - 1) * pageSize)
                .Take(pageSize)
                .Select(g=> new InstallmentsDTO
                {
                    Date = g.Date,
                    Description = g.Description,
                    Parts = (int)g.PartCount,
                    Price = (int)g.Price

                })
                .ToListAsync();

            return (data,maxPage);
        }
    }
}
