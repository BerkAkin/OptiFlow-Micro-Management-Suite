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
                                Title="Dummy Answer 1"
                            },
                        }

                     },
                    }

                };

                await _context.AddAsync(survey);
                await _context.SaveChangesAsync();
            }
        }
    }
}
