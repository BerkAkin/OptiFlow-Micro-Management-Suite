using AuthModule.Data;
using AuthModule.Models;
public static class DbSeeder
{
    public static void Seed(AuthDBContext context)
    {
        if (context.Users.Any()) return; 

       
        var tenantA = new Tenant { Name = "TenantA", };
        var tenantB = new Tenant { Name = "TenantB" };

        var moduleD = new Module { Name = "D_Module" };
        var moduleF = new Module { Name = "F_Module" };

        tenantA.TenantModules = new List<TenantModule> {
            new TenantModule { Tenant = tenantA, Module = moduleD },
            new TenantModule { Tenant = tenantA, Module = moduleF }
        };
        tenantB.TenantModules = new List<TenantModule> {
            new TenantModule { Tenant = tenantB, Module = moduleF }
        };

        context.Users.AddRange(
            new User { Name = "User1", Surname="Temp", PasswordHash="asdafasf", Email="berk@mail", Tenant = tenantA }
        );

        context.SaveChanges();
    }
}
