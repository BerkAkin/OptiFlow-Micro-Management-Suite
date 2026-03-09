using Microsoft.EntityFrameworkCore;
using MoodModule.Domain.Entities;
using MoodModule.Domain.Enums;
using MoodModule.Infrastructure.Persistence;


namespace MoodModule.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(MoodDbContext context)
        {
            if (!await context.Users.AnyAsync())
            {
                MiniUser user1 = new MiniUser("berk", "berk@mail.com", 1,1);
                user1.AddMoodRecord(4, [1,2,3,4]);
                user1.AddComment("Kullanıcı 1'e ait deneme yorumu");
                await context.Users.AddAsync(user1);
                await context.SaveChangesAsync();
            }
        }
    }
}