using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Application.Interfaces;
using SupportModule.Application.Middlewares;
using SupportModule.Infrastructure.Hubs;
using SupportModule.Infrastructure.Persistence;
using SupportModule.Infrastructure.Repositories;
using SupportModule.Infrastructure.Security;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IUserIdProvider, HeaderUserIdProvider>();
builder.Services.AddSignalR();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

builder.Services.AddDbContext<SupportDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SupportModuleDb")));

builder.Services.AddHttpContextAccessor();


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateSupportRequestCommand).Assembly));
builder.Services.AddScoped<ISupportRepository,SupportRepository>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();



var app = builder.Build();

app.UseCors();
app.UseWebSockets();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<CookieMiddleware>();
app.MapControllers();
app.MapHub<HrSupportHub>("/hr-support");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}




app.Run();
