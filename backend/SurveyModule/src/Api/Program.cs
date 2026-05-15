using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;
using SurveyModule.Application.Queries.GetSurveysQuery;
using SurveyModule.Infrastructure.Persistance;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();





builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

builder.Services.AddDbContext<SurveyDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SurveyModuleDb")));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetSurveyQuery).Assembly));


var app = builder.Build();

app.UseCors();

using (var scope = app.Services.CreateScope())
{
    var surveyDb = scope.ServiceProvider.GetRequiredService<SurveyDbContext>();
    await surveyDb.Database.MigrateAsync();
    await DbSeeder.Seed(surveyDb);
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
