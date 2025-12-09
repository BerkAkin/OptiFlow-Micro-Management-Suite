using AuthModule.Data;
using AuthModule.Models;
public static class DbSeeder
{
    public static void Seed(AuthDBContext context)
    {
        if(context.Departments.Any()) return;
        if(context.Modules.Any()) return;


        var financeModule = new Module { Name = "FIN" };
        var surveyModule = new Module { Name = "SUR" };
        var suggestionModule = new Module { Name = "SUG" };
        var supportModule = new Module { Name = "SUP" };
        var moodsModule = new Module { Name = "MOO" };

        var financeAccountant = new Department { Name = "Finance Accountant" };
        var humanResources = new Department { Name = "Human Resources" };
        var manager = new Department { Name = "Manager" };
        var employee = new Department { Name = "Employee" };

        context.Departments.AddRange(employee,financeAccountant,humanResources,manager);
        context.Modules.AddRange(financeModule,surveyModule,suggestionModule,supportModule,moodsModule);

        context.SaveChanges();
    }
}
