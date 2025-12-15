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

        public async Task<List<Transaction>> GetAllTransactions()
        {
            return await _context.Transactions.OrderBy(x=>x.Date).ToListAsync();
        }

        public async Task<List<MonthlyTransactionViewModel>> GetMonthlySummary()
        {
            return await _context.Transactions.Where(t => t.Date >= DateTime.UtcNow.AddMonths(-11) && t.Date <= DateTime.UtcNow)
                .GroupBy(t => new { t.Date.Year, t.Date.Month }).Select(g => new MonthlyTransactionViewModel
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Income = g.Where(x => x.IsIncome).Where(x=>x.Date.Year== DateTime.UtcNow.Year).Sum(x => x.Price),
                    Expense = g.Where(x => !x.IsIncome).Where(x => x.Date.Year == DateTime.UtcNow.Year).Sum(x => x.Price),
                })
                .OrderBy(x => x.Year)
                .ThenBy(x => x.Month)
                .ToListAsync();
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
                    prev.Name == curr.Name &&
                    prev.Category == curr.Category &&
                    Math.Abs(prev.Date.Day - curr.Date.Day) <= 3
                )
            )
            .Select(t => new RecurrentsViewModel
            {
                Description = t.Description,
                Price = t.Price,
                To = t.ByWho,
                Recurs = t.Date.Day
            })
            .ToList();

            return recurrent;
        }

        

    }
}
