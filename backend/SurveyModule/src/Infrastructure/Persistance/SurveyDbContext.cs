using Microsoft.EntityFrameworkCore;
using SurveyModule.Domain.Entities;

namespace SurveyModule.Infrastructure.Persistance
{
    public class SurveyDbContext: DbContext
    {
        public SurveyDbContext(DbContextOptions<SurveyDbContext> options): base(options)
        {

        }

        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<MiniUser> MiniUsers { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Survey>()
                .HasMany(s => s.Questions)
                .WithOne(q => q.Survey)
                .HasForeignKey(q => q.SurveyId);

            modelBuilder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId);

            modelBuilder.Entity<MiniUser>()
                .HasMany(u => u.UserAnswers)
                .WithOne(ua => ua.User)
                .HasForeignKey(ua => ua.UserId);

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
