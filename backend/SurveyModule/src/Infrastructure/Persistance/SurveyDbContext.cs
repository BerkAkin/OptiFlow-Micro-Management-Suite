using Microsoft.EntityFrameworkCore;
using SurveyModule.Domain.Entities;

namespace SurveyModule.Infrastructure.Persistance
{
    public class SurveyDbContext : DbContext
    {
        public SurveyDbContext(DbContextOptions<SurveyDbContext> options) : base(options)
        {

        }

        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Users)
                .WithOne(u => u.Tenant)
                .HasForeignKey(u => u.TenantId);

            modelBuilder.Entity<Tenant>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Tenant>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Tenant>()
                .HasMany(t => t.Survey)
                .WithOne(s => s.Tenant)
                .HasForeignKey(s => s.TenantId);



            modelBuilder.Entity<Survey>()
                .HasMany(s => s.Questions)
                .WithOne(q => q.Survey)
                .HasForeignKey(q => q.SurveyId);



            modelBuilder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId);

            modelBuilder.Entity<UserAnswer>()
                .HasIndex(x => new { x.UserId, x.SurveyId, x.QuestionId })
                .IsUnique();


            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.Question)
                .WithMany()
                .HasForeignKey(ua => ua.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.Answer)
                .WithMany()
                .HasForeignKey(ua => ua.AnswerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.Survey)
                .WithMany()
                .HasForeignKey(ua => ua.SurveyId)
                .OnDelete(DeleteBehavior.Restrict);





        }

    }
}
