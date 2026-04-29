using FinanceModule.Domain.Entities;
using FinanceModule.Entities;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.DBOperations
{
    public class FinanceDBContext: DbContext
    {
        public FinanceDBContext(DbContextOptions<FinanceDBContext> options): base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Invoice> Invoices { get; set; } 
        public DbSet<TenantSummary> Tenants { get; set; }
        public DbSet<InvoiceProducts> InvoiceProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TenantSummary>()
                .Property(ts => ts.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<TenantSummary>()
                .HasMany(ts => ts.Invoices)
                .WithOne(i => i.TenantSummary)
                .HasForeignKey(i => i.TenantSummaryId);

            modelBuilder.Entity<TenantSummary>()
                .HasMany(ts => ts.Transactions)
                .WithOne(t => t.TenantSummary)
                .HasForeignKey(t => t.TenantSummaryId);

            modelBuilder.Entity<Invoice>()
                .HasMany(i => i.Products)
                .WithOne(p => p.Invoice)
                .HasForeignKey(p => p.InvoiceId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
