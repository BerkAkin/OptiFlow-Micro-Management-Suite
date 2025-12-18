using FinanceModule.DBOperations;
using FinanceModule.Entities;

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
       
    }
}
