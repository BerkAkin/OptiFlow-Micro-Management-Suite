using AuthModule.Models;
using Microsoft.EntityFrameworkCore;
namespace AuthModule.Data

{
    public class AuthDBContext : DbContext
    {
        public AuthDBContext(DbContextOptions<AuthDBContext> options) :base(options) { 
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<PasswordToken> PasswordTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.RefreshToken)
                .WithOne(rt => rt.User)
                .HasForeignKey<RefreshToken>(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasOne(u => u.PasswordToken)
                .WithOne(rt => rt.User)
                .HasForeignKey<PasswordToken>(pt => pt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Email).IsRequired().HasMaxLength(150);
            });



            modelBuilder.Entity<PasswordToken>()
                .HasOne(pt => pt.User)
                .WithOne(u => u.PasswordToken);

            modelBuilder.Entity<PasswordToken>()
                .HasIndex(pt => pt.ResetToken);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
