using Microsoft.EntityFrameworkCore;
using MoodModule.Domain.Entities;
using MoodModule.Domain.Enums;

namespace MoodModule.Infrastructure.Persistence
{
    public class MoodDbContext: DbContext
    {
        public MoodDbContext(DbContextOptions<MoodDbContext> options) : base(options) { }
        public DbSet<MiniUser> Users { get; set; }
        public DbSet<MoodRecord> Moods { get; set; }
        public DbSet<Comment> Comments { get; set; }
 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MoodRecord>()
                .Property(m => m.Tags)
                .HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(Enum.Parse<TagsEnum>)
                .ToList());

            modelBuilder.Entity<MiniUser>()
                .HasMany(mu => mu.MoodRecords)
                .WithOne(m => m.User)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Comment>()
                .HasOne(c=>c.User)
                .WithMany(mu=>mu.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
