using FinanceModule.DBOperations;
using FinanceModule.Mappings;
using FinanceModule.Queries.Dashboard;
using FinanceModule.Repositories;
using FinanceModule.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("FinanceModuleDb");
builder.Services.AddDbContext<FinanceDBContext>(options => { options.UseSqlServer(connectionString); });
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddScoped<TransactionService>();
builder.Services.AddScoped<TransactionRepository>();
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile(new MappingProfile());
});



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FinanceDBContext>();
    db.Database.Migrate();
}



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
