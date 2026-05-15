using AuthModule.Application.Interfaces;
using AuthModule.Application.Services;
using AuthModule.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Minio;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;



var builder = WebApplication.CreateBuilder(args);




builder.Services.AddDbContext<AuthDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AuthModuleDb")));
builder.Services.AddScoped<RefreshTokenService>();


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton<TokenService>(provider =>
{
    var jwtSettings = builder.Configuration.GetSection("JwtSettings");
    string secretKey = jwtSettings["SecretKey"];
    int expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"]);
    return new TokenService(secretKey, expiryMinutes);
});

builder.Services.AddMinio(configureSource => configureSource
    .WithEndpoint("minio:9000")
    .WithCredentials("admin", "MicroUser123!")
    .WithSSL(false)
    .Build());

builder.Services.AddScoped<IStorageService, MinioStorageService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AuthDBContext>();
    await dbContext.Database.MigrateAsync();
    await DbSeeder.Seed(dbContext);
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
