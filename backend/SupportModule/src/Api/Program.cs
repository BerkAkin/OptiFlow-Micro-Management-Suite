using Microsoft.EntityFrameworkCore;
using SuggestionModule.Infrastructure.Security;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Application.Interfaces;
using SupportModule.Application.Middlewares;
using SupportModule.Infrastructure.Persistence;
using SupportModule.Infrastructure.Repositories;

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

builder.Services.AddDbContext<SupportDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SupportModuleDb")));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateSupportRequestCommand).Assembly));
builder.Services.AddScoped<ISupportRepository,SupportRepository>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();



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

app.Run();
