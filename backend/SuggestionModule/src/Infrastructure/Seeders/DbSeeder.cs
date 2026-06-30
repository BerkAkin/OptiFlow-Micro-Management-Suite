using Microsoft.EntityFrameworkCore;
using SuggestionModule.Domain.Entities;
using SuggestionModule.Domain.Enums;
using SuggestionModule.Infrastructure.Persistence;


namespace SuggestionModule.Infrastructure.Seeders
{
    public static class DbSeeder
    {
        public static async Task Seed(SuggestionDbContext context)
        {
            if (!await context.Tenants.AnyAsync())
            {
                Tenant tenant = new Tenant(1, "Company 1");
                tenant.AddUser(1, "User Firstname");

                Suggestion suggest = tenant.AddSuggestion("Suggestion 1", "Suggestion Description", 1);
                suggest.AddComment(1, "Comment Text");
                suggest.AddVote(1, VoteType.Upvote);

                context.Tenants.AddAsync(tenant);
            }

            await context.SaveChangesAsync();


        }
    }
}