using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Enums;
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
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DayOff> DayOffs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Tenant>().HasQueryFilter(t => t.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<User>().HasQueryFilter(u => u.IsActive == IsActiveEnum.Active && u.Tenant.IsActive == IsActiveEnum.Active);

            modelBuilder.Entity<SupportRequest>().HasQueryFilter(sr => sr.User != null && sr.User.IsActive == IsActiveEnum.Active && sr.User.Tenant.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<DayOff>().HasQueryFilter(d => d.User != null && d.User.IsActive == IsActiveEnum.Active && d.User.Tenant.IsActive == IsActiveEnum.Active);


            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Users)
                .WithOne(u => u.Tenant)
                .HasForeignKey(u => u.TenantId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Tenant>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<Tenant>()
                .Property(x => x.Id)
                .ValueGeneratedNever();


            modelBuilder.Entity<SupportMessage>()
                .HasOne(sm => sm.SupportRequest)
                .WithMany(sr => sr.Messages)
                .HasForeignKey(sm => sm.SupportRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SupportRequest>()
                .HasOne(sr => sr.User)
                .WithMany(u => u.SupportRequests)
                .HasForeignKey(sr => sr.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DayOff>()
                .HasOne(dao => dao.User)
                .WithMany(u => u.DayOffs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
