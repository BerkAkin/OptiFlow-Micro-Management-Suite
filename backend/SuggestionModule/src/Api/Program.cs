using MassTransit;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;
using SuggestionModule.Application.Queries.GetSuggestionsQuery;
using SuggestionModule.Infrastructure.Messaging;
using SuggestionModule.Infrastructure.Persistence;
using SuggestionModule.Infrastructure.Seeders;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<SuggestionDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SuggestionModuleDb")));
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetSuggestionsQuery).Assembly));



var rabbitMqHost = builder.Configuration["RabbitMq:Host"] ?? "localhost";
var userName = builder.Configuration["RabbitMq:UserName"] ?? "guest";
var password = builder.Configuration["RabbitMq:Password"] ?? "guest";

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<SuggestionUserCreatedConsumer>();
    x.AddConsumer<SuggestionUserUpdatedConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(rabbitMqHost, "/", h =>
        {
            h.Username(userName);
            h.Password(password);
        });

        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var suggestionDb = scope.ServiceProvider.GetRequiredService<SuggestionDbContext>();
    await suggestionDb.Database.MigrateAsync();
    await DbSeeder.Seed(suggestionDb);
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
