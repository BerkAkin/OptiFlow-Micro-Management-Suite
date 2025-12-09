using AuthModule.Data;
using AuthModule.Mappings;
using AuthModule.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;



var builder = WebApplication.CreateBuilder(args);



builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile(new MappingProfile());
});



builder.Services.AddDbContext<AuthDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AuthModuleDb")));
builder.Services.AddScoped<AuthService>();



builder.Services.AddSingleton<TokenCreateService>(provider =>
{
    var jwtSettings = builder.Configuration.GetSection("JwtSettings");
    string secretKey = jwtSettings["SecretKey"];
    int expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"]);
    return new TokenCreateService(secretKey, expiryMinutes);
});



builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AuthDBContext>();
    dbContext.Database.EnsureDeleted();
    dbContext.Database.Migrate();
    DbSeeder.Seed(dbContext);
}


if (app.Environment.IsDevelopment())
{
 app.UseSwagger();
   app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
