using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public class RecurrentsQuery
    {
        private readonly FinanceDBContext _context;
        public RecurrentsQuery(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<(List<RecurrentsDTO> data, int maxPage)> Execute(InstallRecurFilterDTO filters)
        {
            DateTime now = DateTime.Now;
            DateTime currMonthStart = new DateTime(now.Year, now.Month, 1);
            DateTime nextMonthStart = currMonthStart.AddMonths(1);
            DateTime prevMonthStart = currMonthStart.AddMonths(-1);

            var query = _context.Transactions.AsNoTracking().Where(p => p.Date >= prevMonthStart && p.Date < currMonthStart && !p.IsIncome);

            query = query.Where(p => _context.Transactions.Any(c =>
                c.Date >= currMonthStart &&
                c.Date < nextMonthStart &&
                c.Description == p.Description &&
                !c.IsIncome));

            int totalCount = await query.CountAsync();
            int pageSize = 10; 
            int maxPage = (int)Math.Ceiling(totalCount / (double)pageSize);

            var data = await query
                .OrderByDescending(x => x.Date).Skip((filters.Page - 1) * pageSize).Take(pageSize).Select(x => new RecurrentsDTO
                {
                   Description = x.Description,
                   To= x.Who,
                   Recurs= x.Date.Day,
                   Price= x.Price,
                })
                .ToListAsync();

            return (data, maxPage);
        }
    }
}
