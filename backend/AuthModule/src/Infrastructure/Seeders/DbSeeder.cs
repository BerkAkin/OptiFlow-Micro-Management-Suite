using AuthModule.Domain.Entities;
using AuthModule.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public static class DbSeeder
{
    public static async Task Seed(AuthDBContext context)
    {
        if (!await context.Modules.AnyAsync())
        {
            List<Module> modules = new List<Module>
            {
                new Module("Finance"),
                new Module("Surveys"),
                new Module("Suggestions"),
                new Module("Support"),
                new Module("Mood")
            };
            await context.Modules.AddRangeAsync(modules);
        }

        if (!await context.Departments.AnyAsync())
        {

            List<Department> departments = new List<Department>
            {
                new Department("Standart Employee"),
                new Department("Finance Accountant"),
                new Department("Human Resources"),
                new Department("Company Manager")
            };
            await context.Departments.AddRangeAsync(departments);
        }

        if (!await context.Tenants.AnyAsync())
        {

            Tenant tenant = new Tenant(
                 "Company 1", "Company Address", "11111111111", "222222222", "company@mail.com",
                 "Company Tax Office", "3333333333", "44444444444", "5555555555");

            tenant.AssignModule(1);
            tenant.AssignModule(2);
            tenant.AssignModule(3);
            tenant.AssignModule(4);
            tenant.AssignModule(5);
            string hashPass = BCrypt.Net.BCrypt.HashPassword("123");

            tenant.AddUser(
                "User Firstname", "User Lastname", "user@mail.com", hashPass, "111111111", DateTime.UtcNow, "street 1",
                "street 2", "apartment", "door", "province", "district", "Full Address", 4);

            await context.Tenants.AddRangeAsync(tenant);
        }

        await context.SaveChangesAsync();
    }
}