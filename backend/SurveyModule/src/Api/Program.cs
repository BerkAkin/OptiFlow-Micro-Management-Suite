using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Application.Middlewares;
using SurveyModule.Application.Queries.GetSurveysQuery;
using SurveyModule.Infrastructure.Persistance;
using SurveyModule.Infrastructure.Repositories;
using SurveyModule.Infrastructure.Security;
using SurveyModule.Seeder;

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

builder.Services.AddTransient<DummyDataSeeder>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetSurveyQuery).Assembly));

builder.Services.AddScoped<ISurveyRepository,SurveysRepository>();






var app = builder.Build();

app.UseCors();


app.UseMiddleware<CookieMiddleware>();

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

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DummyDataSeeder>();
    await  seeder.Seeder();
}

app.Run();
