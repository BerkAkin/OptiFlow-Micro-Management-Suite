using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.Interfaces;
using SuggestionModule.Application.Queries.GetSuggestionsQuery;
using SuggestionModule.Infrastructure.Persistence;
using SuggestionModule.Infrastructure.Repositories;
using SuggestionModule.Infrastructure.Security;

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

builder.Services.AddDbContext<SuggestionDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SuggestionModuleDb")));


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetSuggestionsQuery).Assembly));

builder.Services.AddScoped<ISuggestionRepository, SuggestionRepository>();



var app = builder.Build();

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
