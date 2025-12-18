using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public class CategoricalSummaryQuery
    {
        private readonly FinanceDBContext _context;
        public CategoricalSummaryQuery(FinanceDBContext context) { 
            _context = context;
        }

        public async Task<List<CategoricalTransactionSummaryDTO>> Execute()
        {
            var now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, 1);
            var end = start.AddMonths(1);

            return await _context.Transactions
            .AsNoTracking()
            .Where(x => x.Date >= start && x.Date < end)
            .GroupBy(x => x.Category)
            .Select(g => new CategoricalTransactionSummaryDTO
            {
                Category = g.Key,
                Expense = g.Where(x=>!x.IsIncome).Sum(x => x.Price)
            }).ToListAsync();

        }
    }
}
