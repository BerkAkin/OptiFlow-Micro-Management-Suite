using Microsoft.EntityFrameworkCore;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Infrastructure.Persistence
{
    public class SuggestionDbContext : DbContext
    {
        public SuggestionDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Suggestion> Suggestions  { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<MiniUser> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Suggestion>()
                .HasMany(s => s.Comments)
                .WithOne(c => c.Suggestion)
                .HasForeignKey(s => s.SuggestionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Suggestion>()
                .HasOne(s=>s.User)
                .WithMany(u=>u.Suggestions)
                .HasForeignKey(s=>s.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(s => s.Comments)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<Vote>()
                .HasOne(v => v.Suggestion)
                .WithMany(s => s.Votes)
                .HasForeignKey(v => v.SuggestionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Vote>()
                .HasOne(v => v.User)
                .WithMany(s => s.Votes)
                .HasForeignKey(v => v.UserId);

            modelBuilder.Entity<Vote>()
                .HasIndex(v => new { v.SuggestionId, v.UserId })
                .IsUnique();

            modelBuilder.Entity<Comment>()
                .HasIndex(c => new { c.SuggestionId, c.UserId })
                .IsUnique();
        }
    }
}
