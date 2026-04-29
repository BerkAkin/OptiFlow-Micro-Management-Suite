using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public record GetMonthlyQuery(int currentTenant):IRequest<MonthlySummaryDTO>;
    public class MonthlySummaryQueryHandler: IRequestHandler<GetMonthlyQuery,MonthlySummaryDTO>
    {
        private readonly FinanceDBContext _context;
        public MonthlySummaryQueryHandler(FinanceDBContext context)
        {
             _context = context;
        }

        public async Task<MonthlySummaryDTO> Handle(GetMonthlyQuery request, CancellationToken cancellationToken)
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-11);
            DateTime endDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(1);


            var query = await _context.Transactions
                .AsNoTracking()
                .Where(x=>x.TenantSummaryId==request.currentTenant && x.Date < endDate && x.Date >= startDate)
                .GroupBy(x => new { x.Date.Year, x.Date.Month })
                .OrderBy(group => group.Key.Month)
                .Select(group => new
                {
                    group.Key.Month,
                    Expense = group.Sum(x => !x.IsIncome ? x.Price : 0),
                    Income = group.Sum(x => x.IsIncome ? x.Price : 0)
                }).ToListAsync(cancellationToken);

            return new MonthlySummaryDTO
            {
                Incomes = query.Select(x => new MonthlyValueDTO
                {
                    Month = x.Month,
                    Value = x.Income
                }).ToList(),

                Expenses = query.Select(x => new MonthlyValueDTO
                {
                    Month = x.Month,
                    Value = x.Expense
                }).ToList()
            };
        }
    }
}
