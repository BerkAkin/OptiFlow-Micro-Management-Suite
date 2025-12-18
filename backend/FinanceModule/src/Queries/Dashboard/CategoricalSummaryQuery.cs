using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{

    public record CategoricalSummaryQuery(): IRequest<List<CategoricalTransactionSummaryDTO>>;
    public class CategoricalSummaryQueryHandler : IRequestHandler<CategoricalSummaryQuery, List<CategoricalTransactionSummaryDTO>>
    {
        private readonly FinanceDBContext _context;
        public CategoricalSummaryQueryHandler(FinanceDBContext context) { 
            _context = context;
        }

        public async Task<List<CategoricalTransactionSummaryDTO>> Handle(CategoricalSummaryQuery request, CancellationToken cancellationToken)
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
