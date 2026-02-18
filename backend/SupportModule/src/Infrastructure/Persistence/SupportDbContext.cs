using Microsoft.EntityFrameworkCore;
using SupportModule.Domain.Entities;

namespace SupportModule.Infrastructure.Persistence
{
    public class SupportDbContext : DbContext
    {
        public SupportDbContext(DbContextOptions<SupportDbContext> options) : base(options)
        {

        }

        public DbSet<SupportRequest> SupportRequests { get; set; }
        public DbSet<SupportMessage> SupportMessages { get; set; }
        public DbSet<MiniUser> Users { get; set; }
        public DbSet<UserComment> UserComments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SupportMessage>()
                .HasOne(sm => sm.SupportRequest)
                .WithMany(sr => sr.SupportMessages)
                .HasForeignKey(sm => sm.SupportRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SupportRequest>()
                .HasOne(sr => sr.User)
                .WithMany(u => u.SupportRequest)
                .HasForeignKey(sr => sr.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserComment>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserComments)
                .HasForeignKey(uc => uc.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
