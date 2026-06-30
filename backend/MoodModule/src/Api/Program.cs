using MassTransit;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.Queries.GetMoodsQuery;
using MoodModule.Infrastructure.Messaging;
using MoodModule.Infrastructure.Persistence;
using MoodModule.Infrastructure.Seeders;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;

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


builder.Services.AddDbContext<MoodDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MoodModuleDb")));
builder.Services.AddHttpContextAccessor();



builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetMoodsQuery).Assembly));
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();


var rabbitMqHost = builder.Configuration["RabbitMq:Host"] ?? "localhost";
var userName = builder.Configuration["RabbitMq:UserName"] ?? "guest";
var password = builder.Configuration["RabbitMq:Password"] ?? "guest";

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<MoodUserCreatedConsumer>();
    x.AddConsumer<MoodUserUpdatedConsumer>();
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






app.UseCors();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MoodDbContext>();
    await DbSeeder.SeedAsync(context);
}


app.Run();
