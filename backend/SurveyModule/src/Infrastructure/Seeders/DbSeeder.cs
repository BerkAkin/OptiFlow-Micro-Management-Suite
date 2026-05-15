
using Microsoft.EntityFrameworkCore;
using SurveyModule.Domain.Entities;
using SurveyModule.Infrastructure.Persistance;

public static class DbSeeder
{
    public static async Task Seed(SurveyDbContext context)
    {


        if (!await context.Tenants.AnyAsync())
        {

            Tenant tenant = new Tenant(1, "Company 1");
            tenant.AddUser(1, "User Firstname");

            Survey survey = tenant.AddSurvey("Survey Template");
            for (int i = 1; i <= 5; i++)
            {
                Question question = survey.AddQuestion("Question " + i);
                for (int j = 1; j <= 5; j++)
                {
                    question.AddAnswer("Answer " + i + "-" + j);
                }
            }
            context.Tenants.Add(tenant);
            await context.SaveChangesAsync();
        }

    }
}