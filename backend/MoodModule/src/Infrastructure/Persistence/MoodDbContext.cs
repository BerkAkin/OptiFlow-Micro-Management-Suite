using Microsoft.EntityFrameworkCore;
using MoodModule.Domain.Entities;
using MoodModule.Domain.Enums;

namespace MoodModule.Infrastructure.Persistence
{
    public class MoodDbContext : DbContext
    {
        public MoodDbContext(DbContextOptions<MoodDbContext> options) : base(options) { }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<MoodRecord> Moods { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Users)
                .WithOne(u => u.Tenant)
                .HasForeignKey(u => u.TenantId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tenant>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<Tenant>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<User>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<MoodRecord>()
                .Property(m => m.Tags)
                .HasConversion(v => string.Join(',', v), v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(Enum.Parse<TagsEnum>)
                .ToList());

            modelBuilder.Entity<User>()
                .HasMany(u => u.MoodRecords)
                .WithOne(m => m.User)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
