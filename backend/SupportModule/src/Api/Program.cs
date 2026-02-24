using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Infrastructure.Hubs;
using SupportModule.Infrastructure.Persistence;
using SupportModule.Infrastructure.Seeders;


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
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();



var app = builder.Build();

app.UseCors();
app.UseWebSockets();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

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

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SupportDbContext>();
    await DataSeeder.SeedAsync(context);
}


app.Run();
