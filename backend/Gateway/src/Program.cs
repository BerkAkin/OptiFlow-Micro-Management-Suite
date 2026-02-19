using Gateway.Handlers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "AuthModule",
            ValidAudience = "Gateway",
            IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
        };

       
    });
builder.Services.AddTransient<JwtToHeaderHandler>();
builder.Services.AddOcelot(builder.Configuration).AddDelegatingHandler<JwtToHeaderHandler>(true);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAny",
        policy => policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()); 
});

var app = builder.Build();
app.UseWebSockets(); 
app.UseHttpsRedirection();
app.UseCors("AllowAny");

app.UseAuthentication();
app.UseAuthorization();


app.Use(async (context, next) => {
    if (context.Request.Path.Value.Contains("/hr-support") &&
        context.Request.Query.TryGetValue("access_token", out var token))
    {
        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        if (handler.CanReadToken(token))
        {
            var jwtToken = handler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId" || c.Type == "sub")?.Value;

            if (!string.IsNullOrEmpty(userId))
            {
                context.Request.Headers["X-User-Id"] = userId;
                Console.WriteLine($"[Gateway Log] WebSocket için ID yakalandý: {userId}");
            }
        }
    }
    await next();
});

await app.UseOcelot();



app.Run();
