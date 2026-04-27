using AuthModule.Domain.Entities;
using AuthModule.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public static class DbSeeder
{
    public static async Task Seed(AuthDBContext context)
    {
        if (!await context.Modules.AnyAsync())
        {
            var modules = new List<Module>
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

            var departments = new List<Department>
            {
                new Department("Standart Employee"),
                new Department("Finance Accountant"), 
                new Department("Human Resources"),    
                new Department("Company Manager")     
            };
            await context.Departments.AddRangeAsync(departments);
        }

        await context.SaveChangesAsync();
    }
}