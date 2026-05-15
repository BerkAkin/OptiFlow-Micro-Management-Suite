using FinanceModule.DBOperations;
using FinanceModule.Entities;
using Microsoft.EntityFrameworkCore;

public static class DbSeeder
{
    public static async Task Seed(FinanceDBContext context)
    {
        if (!await context.Tenants.AnyAsync())
        {
            TenantSummary tenant = new TenantSummary(1, "Company 1", "Company Address", "11111111111", "22222222", "company@mail.com",
                                                        "Company Tax Office", "333333333", "444444444", "555555555");

            tenant.AddTransaction(1, "By Company", "TRY", DateTime.UtcNow, "Description 1", false, 1, 350, false, "Food", "");
            tenant.AddTransaction(1, "By Outsider", "USD", DateTime.UtcNow, "Description 2", false, 1, 1900, true, "Transport", "");
            tenant.AddTransaction(1, "By Company", "TRY", DateTime.UtcNow, "Description 3", true, 6, 3600, false, "Food", "");

            await context.Tenants.AddAsync(tenant);
        }

        await context.SaveChangesAsync();
    }
}