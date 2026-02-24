using SupportModule.Domain.Entities;
using SupportModule.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using SupportModule.Domain.Enums;

namespace SupportModule.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(SupportDbContext context)
        {
            if (!await context.Users.AnyAsync())
            {
                MiniUser user1 = new MiniUser("berk", "berk@mail.com", tenantId: 1);
                await context.Users.AddAsync(user1);
                await context.SaveChangesAsync();

                SupportRequest request1 = new SupportRequest(user1.Id, tenantId: 1,SupportCategories.General);
                await context.SupportRequests.AddAsync(request1);
                await context.SaveChangesAsync();

                UserComment comment1 = new UserComment("Hello from berk", user1.Id);
                await context.UserComments.AddAsync(comment1);
                await context.SaveChangesAsync();

                request1.AddMessage("İstek 1 için yeni mesaj", user1.Id);
                await context.SaveChangesAsync();
            }
        }
    }
}