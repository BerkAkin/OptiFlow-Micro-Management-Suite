using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public record MonthlySummaryQuery():IRequest<MonthlySummaryDTO>;
    public class MonthlySummaryQueryHandler: IRequestHandler<MonthlySummaryQuery,MonthlySummaryDTO>
    {
        private readonly FinanceDBContext _context;
        public MonthlySummaryQueryHandler(FinanceDBContext context)
        {
             _context = context;
        }

        public async Task<MonthlySummaryDTO> Handle(MonthlySummaryQuery request, CancellationToken cancellationToken)
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-11);
            DateTime endDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(1);


            var query = await _context.Transactions
                .AsNoTracking()
                .Where(x => x.Date < endDate && x.Date >= startDate)
                .GroupBy(x => new { x.Date.Year, x.Date.Month })
                .OrderBy(x => x.Key.Month)
                .Select(g => new
                {
                    g.Key.Month,
                    Expense = g.Where(x=>!x.IsIncome).Sum(x=>x.Price),
                    Income = g.Where(x => x.IsIncome).Sum(x => x.Price),
                }).ToListAsync();

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
