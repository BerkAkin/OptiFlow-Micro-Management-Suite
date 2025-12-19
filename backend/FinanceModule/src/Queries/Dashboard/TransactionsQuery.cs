using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Queries.Dashboard
{
    public record TransactionsQuery(FinanceFilterDTO filters): IRequest<(List<TransactionDTO> data, int maxPage)>;
    public class TransactionsQueryHandler: IRequestHandler<TransactionsQuery, (List<TransactionDTO> data, int maxPage)>
    {
        private readonly FinanceDBContext _context;
        public TransactionsQueryHandler(FinanceDBContext context)
        {
            _context = context;
        }

        public async Task<(List<TransactionDTO> data, int maxPage)> Handle(TransactionsQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Transactions.AsNoTracking().AsQueryable();

            if (!string.IsNullOrEmpty(request.filters.Type))
            {
                bool isIncome = request.filters.Type == "1";
                query = query.Where(x => x.IsIncome == isIncome);
            }


            if (!string.IsNullOrEmpty(request.filters.Date) && DateTime.TryParse(request.filters.Date, out DateTime parsedDate))
            {
                query = query.Where(x => x.Date.Date == parsedDate.Date);
            }

            int pageSize = 14;
            int page = request.filters.Page <= 0 ? 1 : request.filters.Page;
            int totalCount = await query.CountAsync();
            int maxPage = (int)Math.Ceiling((double)totalCount / pageSize);
            if (maxPage == 0) maxPage = 1;

            var data = await query.OrderByDescending(x => x.Date).Skip((request.filters.Page - 1) * pageSize).Take(pageSize).Select(x=>new TransactionDTO
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
