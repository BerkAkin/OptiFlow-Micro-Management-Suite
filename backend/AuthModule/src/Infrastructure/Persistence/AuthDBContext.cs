using AuthModule.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Enums;
namespace AuthModule.Infrastructure.Persistence

{
    public class AuthDBContext : DbContext
    {
        public AuthDBContext(DbContextOptions<AuthDBContext> options) : base(options)
        {

        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<PasswordToken> PasswordTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Tenant>().HasQueryFilter(t => t.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<User>().HasQueryFilter(u => u.IsActive == IsActiveEnum.Active && u.Tenant.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<RefreshToken>().HasQueryFilter(rt => rt.User.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<PasswordToken>().HasQueryFilter(rt => rt.User.IsActive == IsActiveEnum.Active);


            modelBuilder.Entity<User>()
                .HasOne(u => u.Department)
                .WithMany()
                .HasForeignKey(u => u.DepartmentId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Tenant)
                .WithMany(t => t.Users)
                .HasForeignKey(u => u.TenantId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasOne(u => u.RefreshToken)
                .WithOne(rt => rt.User)
                .HasForeignKey<RefreshToken>(rt => rt.UserId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.PasswordToken)
                .WithOne(rt => rt.User)
                .HasForeignKey<PasswordToken>(pt => pt.UserId);

            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.TenantModules)
                .WithOne(tm => tm.Tenant);

            modelBuilder.Entity<Module>()
                .HasMany(m => m.TenantModules)
                .WithOne(tm => tm.Module);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Email).IsRequired().HasMaxLength(150);
            });


            modelBuilder.Entity<PasswordToken>()
                .HasIndex(pt => pt.ResetToken);

            modelBuilder.Entity<TenantModule>()
                .HasKey(tm => new { tm.TenantId, tm.ModuleId });

            modelBuilder.Entity<RefreshToken>()
                .HasIndex(rt => rt.Token);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
