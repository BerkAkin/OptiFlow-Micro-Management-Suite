using SurveyModule.Domain.Entities;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Seeder
{
    public class DummyDataSeeder
    {
        private readonly SurveyDbContext _context;
        public DummyDataSeeder(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task Seeder()
        {
           await SeedSurveys();
            await SeedUsers();
        }
        public async Task SeedSurveys()
        {
            if (!_context.Surveys.Any())
            {
                Survey survey = new Survey()
                {
                    TenantId = 1,
                    CreatorId = 1,
                    CreatedAt = DateTime.UtcNow,
                    Status = Domain.Enums.SurveyStatus.Published,
                    Title = "Dummy 1",
                    Questions = new List<Question>
                    {
                     new Question {
                        Title= "Dummy question 1",
                        Answers= new List<Answer>{
                            new Answer
                            {
                                Title="Dummy Answer 1-1"
                            },
                             new Answer
                            {
                                Title="Dummy Answer 1-2"
                            },
                              new Answer
                            {
                                Title="Dummy Answer 1-3"
                            },
                        }

                     },
                     new Question {
                        Title= "Dummy question 2",
                        Answers= new List<Answer>{
                            new Answer
                            {
                                Title="Dummy Answer 2-1"
                            },
                             new Answer
                            {
                                Title="Dummy Answer 2-2"
                            },
                              new Answer
                            {
                                Title="Dummy Answer 2-3"
                            },
                        }

                     },
                    }

                };

                await _context.Surveys.AddAsync(survey);
                await _context.SaveChangesAsync();
            }
        }

        public async Task SeedUsers()
        {
            if (!_context.MiniUsers.Any())
            {
                MiniUser user = new MiniUser()
                {
                    Email = "Berk@mail.com",
                    UserAnswers = new List<UserAnswer>() { },
                    Username="BerkA"
                };            
            await _context.MiniUsers.AddAsync(user);
            await _context.SaveChangesAsync();
            }

        }
    }
}
