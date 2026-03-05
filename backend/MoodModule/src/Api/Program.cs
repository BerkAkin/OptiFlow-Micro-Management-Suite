using Microsoft.EntityFrameworkCore;
using MoodModule.Application.Queries.GetMoodsQuery;
using MoodModule.Infrastructure.Persistence;
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


//using (var scope = app.Services.CreateScope())
//{
//    var context = scope.ServiceProvider.GetRequiredService<SupportDbContext>();
//    await DataSeeder.SeedAsync(context);
//}


app.Run();
