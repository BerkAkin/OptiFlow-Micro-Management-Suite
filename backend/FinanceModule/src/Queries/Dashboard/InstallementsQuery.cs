using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public class InstallementsQuery
    {
        private readonly FinanceDBContext _context;
        public InstallementsQuery(FinanceDBContext context) {
            _context = context;
        }

        public async Task<(List<InstallmentsDTO>data,int maxPage)> Execute(InstallRecurFilterDTO filters)
        {
           const int pageSize = 10;
            var query = _context.Transactions
                .AsNoTracking()
                .Where(x => x.IsPartly && !x.IsIncome);

            if (!string.IsNullOrEmpty(filters.Description))
            {
                query = query.Where(x => x.Description.Contains(filters.Description));
            }

            int totalCount = await query.CountAsync();
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);

            var data = await query
                .OrderByDescending(o => o.Date)
                .Skip((filters.Page - 1) * pageSize)
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
