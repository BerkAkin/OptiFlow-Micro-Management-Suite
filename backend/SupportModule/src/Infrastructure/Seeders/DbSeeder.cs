using Microsoft.EntityFrameworkCore;
using SupportModule.Domain.Entities;
using SupportModule.Domain.Enums;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Infrastructure.Seeders
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(SupportDbContext context)
        {
            if (!await context.Users.AnyAsync())
            {
                Tenant tenant = new Tenant(1, "Company 1");
                User usr = tenant.AddUser("User Firstname", "user@mail.com", 1, 4);
                usr.AddDayOff("User Topic", "User Description", 10, DateTime.UtcNow);

                await context.Tenants.AddAsync(tenant);
                await context.SaveChangesAsync();

                SupportRequest request1 = new SupportRequest(usr.Id, 1, SupportCategories.General);
                await context.SupportRequests.AddAsync(request1);
                request1.AddMessage("New message from user", usr.Id);

                await context.SaveChangesAsync();

            }
        }
    }
}