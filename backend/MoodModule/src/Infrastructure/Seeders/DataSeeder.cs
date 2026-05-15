using Microsoft.EntityFrameworkCore;
using MoodModule.Domain.Entities;
using MoodModule.Infrastructure.Persistence;


namespace MoodModule.Infrastructure.Seeders
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(MoodDbContext context)
        {
            if (!await context.Users.AnyAsync())
            {
                Tenant tenant = new Tenant(1, "Company 1");
                User usr = tenant.AddUser(1, "User 1", "user@mail.com");
                usr.AddMoodRecord(4, new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 });
                usr.AddComment("User 1 Comment");
                await context.Tenants.AddAsync(tenant);
                await context.SaveChangesAsync();
            }
        }
    }
}