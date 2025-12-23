using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Application.Queries.GetSurveyDetails;
using SurveyModule.Application.Queries.GetSurveys;
using SurveyModule.Infrastructure.Persistance;
using SurveyModule.Infrastructure.Repositories;
using SurveyModule.Seeder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SurveyDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SurveyModuleDb")));
builder.Services.AddTransient<DummyDataSeeder>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetSurveyQuery).Assembly));
builder.Services.AddScoped<ISurveyRepository,SurveysRepository>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DummyDataSeeder>();
    await  seeder.Seeder();
}

app.Run();
