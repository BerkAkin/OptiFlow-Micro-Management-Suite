using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{

    public record GetCategoricalQuery(int currentTenant) : IRequest<List<CategoricalTransactionSummaryDTO>>;
    public class CategoricalSummaryQueryHandler : IRequestHandler<GetCategoricalQuery, List<CategoricalTransactionSummaryDTO>>
    {
        private readonly FinanceDBContext _context;
        public CategoricalSummaryQueryHandler(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<List<CategoricalTransactionSummaryDTO>> Handle(GetCategoricalQuery request, CancellationToken cancellationToken)
        {
            var now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, 1);
            var end = start.AddMonths(1);

            return await _context.Transactions
            .AsNoTracking()
            .Where(x => x.TenantSummaryId == request.currentTenant
                && x.Date >= start && x.Date < end)

            .GroupBy(x => x.Category)
            .Select(group => new CategoricalTransactionSummaryDTO
            {
                Category = group.Key,
                Expense = group.Where(x => !x.IsIncome).Sum(x => x.Price)
            }).ToListAsync(cancellationToken);

        }
    }
}
