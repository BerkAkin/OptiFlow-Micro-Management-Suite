using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using FinanceModule.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Repositories
{
    public class TransactionRepository
    {
        private readonly FinanceDBContext _context;
        public TransactionRepository(FinanceDBContext context) {
            _context = context;
        }

        public async Task AddAsync(Transaction transaction)
        {
            await _context.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task<(List<Transaction>,int MaxPage)> GetAllTransactions(FinanceFilterDto filters)
        {
            var query = _context.Transactions.AsQueryable();

            if (!string.IsNullOrEmpty(filters.Type))
            {
            bool isIncome = filters.Type == "1";
            query = query.Where(x => x.IsIncome == isIncome);
            }
          
            
            if (!string.IsNullOrEmpty(filters.Date) && DateTime.TryParse(filters.Date, out DateTime parsedDate))
            {
                query = query.Where(x => x.Date.Date == parsedDate.Date);
            }

            int pageSize = 8;
            int totalCount = await query.CountAsync();
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);

            var data = await query.OrderByDescending(x => x.Date).Skip((filters.Page - 1) * pageSize).Take(pageSize).ToListAsync();
            return (data, maxPage);
        }

        public async Task<MonthlySummaryViewModel> GetMonthlySummary()
        {
            var grouped = await _context.Transactions.Where(t => t.Date >= DateTime.UtcNow.AddMonths(-11) && t.Date <= DateTime.UtcNow)
                .GroupBy(t => new { t.Date.Year, t.Date.Month }).Select(g => new 
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Income = g.Where(x => x.IsIncome).Where(x=>x.Date.Year== DateTime.UtcNow.Year).Sum(x => x.Price),
                    Expense = g.Where(x => !x.IsIncome).Where(x => x.Date.Year == DateTime.UtcNow.Year).Sum(x => x.Price),
                })
                .OrderBy(x => x.Year)
                .ThenBy(x => x.Month)
                .ToListAsync();


            return new MonthlySummaryViewModel
            {
                Incomes = grouped.Select(x => new MonthlyValueViewModel
                {
                    Month = x.Month,
                    Value = x.Income
                }).ToList(),

                Expenses = grouped.Select(x => new MonthlyValueViewModel
                {
                    Month = x.Month,
                    Value = x.Expense
                }).ToList()
            };
        }

        public async Task<List<CategoricalTransactionSummary>> GetCategoricalSummary()
        {
            return await _context.Transactions.Where(t => t.Date.Year == DateTime.Now.Year && t.Date.Month == DateTime.Now.Month).Where(t=>!t.IsIncome).
                GroupBy(t=>t.Category).Select(g=>new CategoricalTransactionSummary { 

                    Category = g.Key,
                    Expense = g.Sum(x=>x.Price)
                }).ToListAsync();   
        }



        public async Task<List<CategoricalTransactionSummary>> GetMostCategorySummary()
        {
            return await _context.Transactions.Where(t => t.Date.Year == DateTime.Now.Year && t.Date.Month == DateTime.Now.Month).Where(t=>!t.IsIncome)
              .GroupBy(t => t.Category).Select(g => new CategoricalTransactionSummary
              {
                  Category = g.Key,
                  Expense = g.Sum(x => x.Price)
              }).OrderByDescending(x => x.Expense)
              .Take(2)
              .ToListAsync();
        }
        
        public async Task<List<Transaction>> GetInstallments()
        {
            return await _context.Transactions.Where(t => t.IsPartly).Where(t=>!t.IsIncome).OrderByDescending(o => o.Date).ToListAsync();
        }

        public async Task<List<RecurrentsViewModel>> GetRecurrents()
        {
            DateTime now = DateTime.Now;

            DateTime start = new DateTime(now.Year, now.Month, 1);
            DateTime end = start.AddMonths(1);

            DateTime prevStart = start.AddMonths(-1);
            DateTime prevEnd = start;

            var currentMonthExpenses = await _context.Transactions
            .Where(t => !t.IsIncome)
            .Where(t => t.Date >= start && t.Date < end)
            .ToListAsync();

            
            var previousMonthExpenses = await _context.Transactions
            .Where(t => !t.IsIncome)
            .Where(t => t.Date >= prevStart && t.Date < prevEnd)
            .ToListAsync();

            var recurrent = currentMonthExpenses
            .Where(curr =>
                previousMonthExpenses.Any(prev =>
                    prev.Description == curr.Description &&
                    prev.Category == curr.Category &&
                    Math.Abs(prev.Date.Day - curr.Date.Day) <= 3
                )
            )
            .Select(t => new RecurrentsViewModel
            {
                Description = t.Description,
                Price = t.Price,
                To = t.Who,
                Recurs = t.Date.Day
            })
            .ToList();

            return recurrent;
        }

        

    }
}
