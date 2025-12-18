using FinanceModule.DBOperations;
using FinanceModule.Mappings;
using FinanceModule.Queries.Dashboard;
using FinanceModule.Repositories;
using FinanceModule.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);


//BAÐLANTI DÝZESÝNÝ OKUYUP BAÐLANTI KURMA KODU
var connectionString = builder.Configuration.GetConnectionString("FinanceModuleDb");
builder.Services.AddDbContext<FinanceDBContext>(options => { options.UseSqlServer(connectionString); });

builder.Services.AddScoped<TransactionService>();
builder.Services.AddScoped<TransactionRepository>();

builder.Services.AddScoped<TransactionsQuery>();
builder.Services.AddScoped<CategoricalSummaryQuery>();
builder.Services.AddScoped<MonthlySummaryQuery>();
builder.Services.AddScoped<MostCategorySummaryQuery>();
builder.Services.AddScoped<InstallementsQuery>();
builder.Services.AddScoped<RecurrentsQuery>();


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
