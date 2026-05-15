using Microsoft.EntityFrameworkCore;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Infrastructure.Persistence
{
    public class SuggestionDbContext : DbContext
    {
        public SuggestionDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Suggestion> Suggestions { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Tenant> Tenants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Users)
                .WithOne(u => u.Tenant)
                .HasForeignKey(u => u.TenantId);

            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Suggestions)
                .WithOne(s => s.Tenant)
                .HasForeignKey(s => s.TenantId);

            modelBuilder.Entity<Tenant>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Tenant>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<User>()
                .HasMany(u => u.Suggestions)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Votes)
                .WithOne(v => v.User)
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<User>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Suggestion>()
                .HasMany(s => s.Comments)
                .WithOne(c => c.Suggestion)
                .HasForeignKey(c => c.SuggestionId);

            modelBuilder.Entity<Suggestion>()
                .HasMany(s => s.Votes)
                .WithOne(v => v.Suggestion)
                .HasForeignKey(v => v.SuggestionId);

            modelBuilder.Entity<Vote>()
                .HasIndex(v => new { v.UserId, v.SuggestionId })
                .IsUnique();

        }
    }
}
