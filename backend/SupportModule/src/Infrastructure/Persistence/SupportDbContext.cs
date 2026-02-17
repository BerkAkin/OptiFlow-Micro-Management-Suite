using Microsoft.EntityFrameworkCore;
using SupportModule.Domain.Entites;

namespace SupportModule.Infrastructure.Persistence
{
    public class SupportDbContext : DbContext
    {
        public SupportDbContext(DbContextOptions<SupportDbContext> options) : base(options)
        {

        }

        public DbSet<SupportRequest> SupportRequests { get; set; }
        public DbSet<SupportMessage> SupportMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SupportMessage>()
                .HasOne(sm => sm.SupportRequest)
                .WithMany(sr => sr.SupportMessages)
                .HasForeignKey(sm => sm.SupportRequestId)
                .OnDelete(DeleteBehavior.Cascade);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
