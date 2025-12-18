using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public record MostCategorySummaryQuery:IRequest<List<CategoricalTransactionSummaryDTO>>;
    public class MostCategorySummaryQueryHandler:IRequestHandler<MostCategorySummaryQuery, List<CategoricalTransactionSummaryDTO>>
    {
        private readonly FinanceDBContext _context;
        public MostCategorySummaryQueryHandler(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<List<CategoricalTransactionSummaryDTO>> Handle(MostCategorySummaryQuery request, CancellationToken cancellationToken)
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
