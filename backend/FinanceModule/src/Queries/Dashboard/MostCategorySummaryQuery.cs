using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public class MostCategorySummaryQuery
    {
        private readonly FinanceDBContext _context;
        public MostCategorySummaryQuery(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<List<CategoricalTransactionSummaryDTO>> Execute()
        {
            return await _context.Transactions
                .AsNoTracking()
                .Where(x => x.Date.Month == DateTime.Now.Month && x.Date.Year == DateTime.Now.Year && !x.IsIncome)
                .GroupBy(x => x.Category)
                .Select(g => new CategoricalTransactionSummaryDTO
                {
                    Category = g.Key,
                    Expense = g.Sum(x => x.Price)
                })
                .OrderByDescending(x => x.Expense)
                .Take(2)
                .ToListAsync();
        }
    }
}
