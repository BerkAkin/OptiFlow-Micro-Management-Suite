using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public class TransactionsQuery
    {
        private readonly FinanceDBContext _context;
        public TransactionsQuery(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<(List<TransactionDTO> data, int maxPage)> Execute(FinanceFilterDTO filters)
        {
            var query = _context.Transactions.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(filters.Type))
            {
                bool isIncome = filters.Type == "1";
                query = query.Where(x => x.IsIncome == isIncome);
            }


            if (!string.IsNullOrEmpty(filters.Date) && DateTime.TryParse(filters.Date, out DateTime parsedDate))
            {
                query = query.Where(x => x.Date.Date == parsedDate.Date);
            }

            int pageSize = 11;
            int page = filters.Page <= 0 ? 1 : filters.Page;
            int totalCount = await query.CountAsync();
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);
            if (maxPage == 0) maxPage = 1;

            var data = await query.OrderByDescending(x => x.Date).Skip((filters.Page - 1) * pageSize).Take(pageSize).Select(x=>new TransactionDTO
            {
                Category = x.Category,
                Date = x.Date,
                Description = x.Description,
                Exchange = x.ExchangeType,
                Invoice= x.InvoicePath,
                Income = x.IsIncome,
                Quantity = x.Quantity,
                Price = x.Price,
                Who = x.Who
                
            }).ToListAsync();

            return (data, maxPage);
        }

    }
}
