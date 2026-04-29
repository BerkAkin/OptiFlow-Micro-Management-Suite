using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public record GetMostQuery(int currentTenant):IRequest<List<CategoricalTransactionSummaryDTO>>;
    public class MostCategorySummaryQueryHandler:IRequestHandler<GetMostQuery, List<CategoricalTransactionSummaryDTO>>
    {
        private readonly FinanceDBContext _context;
        public MostCategorySummaryQueryHandler(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<List<CategoricalTransactionSummaryDTO>> Handle(GetMostQuery request, CancellationToken cancellationToken)
        {
            return await _context.Transactions
                .AsNoTracking()
                .Where(x => x.TenantSummaryId == request.currentTenant && x.Date.Month == DateTime.Now.Month && x.Date.Year == DateTime.Now.Year && !x.IsIncome)
                .GroupBy(group => group.Category)
                .Select(group => new CategoricalTransactionSummaryDTO
                {
                    Category = group.Key,
                    Expense = group.Sum(x => x.Price)
                })
                .OrderByDescending(x => x.Expense)
                .Take(2)
                .ToListAsync(cancellationToken);
        }
    }
}
