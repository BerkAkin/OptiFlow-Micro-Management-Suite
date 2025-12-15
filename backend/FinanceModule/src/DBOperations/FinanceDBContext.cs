using FinanceModule.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.DBOperations
{
    public class FinanceDBContext: DbContext
    {
        public FinanceDBContext(DbContextOptions<FinanceDBContext> options): base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
    }
}
