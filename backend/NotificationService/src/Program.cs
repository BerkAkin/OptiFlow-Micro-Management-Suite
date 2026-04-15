using Microsoft.EntityFrameworkCore;
using NotificationService.Data;
using NotificationService.Services;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<MailTemplateProvider>();
builder.Services.AddScoped<MailService>();
builder.Services.AddScoped<NotificationManager>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UpdatePreferenceCommand).Assembly));
builder.Services.AddDbContext<AppDbContext>(options =>options.UseSqlServer(builder.Configuration.GetConnectionString("NotificationServiceDb")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
