using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Enums;
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

            modelBuilder.Entity<Tenant>().HasQueryFilter(t => t.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<User>().HasQueryFilter(u => u.IsActive == IsActiveEnum.Active && u.Tenant.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<Survey>().HasQueryFilter(s => s.Tenant != null && s.Tenant.IsActive == IsActiveEnum.Active);
            modelBuilder.Entity<UserAnswer>().HasQueryFilter(u => u.User.IsActive == IsActiveEnum.Active && u.Tenant.IsActive == IsActiveEnum.Active);


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


            modelBuilder.Entity<User>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<User>()
                .Property(x => x.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<Survey>()
                .HasMany(s => s.Questions)
                .WithOne(q => q.Survey)
                .HasForeignKey(q => q.SurveyId);



            modelBuilder.Entity<Question>()
                .HasMany(q => q.Answers)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId);


            modelBuilder.Entity<UserAnswer>().HasKey(x => x.Id);
            modelBuilder.Entity<UserAnswer>().Property(x => x.Id).ValueGeneratedOnAdd();


            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.User)
                .WithMany()
                .HasForeignKey(ua => ua.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserAnswer>()
                .HasOne(ua => ua.Tenant)
                .WithMany()
                .HasForeignKey(ua => ua.TenantId)
                .OnDelete(DeleteBehavior.NoAction);


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
