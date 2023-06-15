using IntelliTect.Coalesce;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using CardFlipGame.Data;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.OpenApi.Models;
using CardFlipGame.Data.Services;
using CardFlipGame.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using CardFlipGame.Data.Hubs;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    // Explicit declaration prevents ASP.NET Core from erroring if wwwroot doesn't exist at startup:
    WebRootPath = "wwwroot"
});

builder.Logging
    .AddConsole()
    // Filter out Request Starting/Request Finished noise:
    .AddFilter<ConsoleLoggerProvider>("Microsoft.AspNetCore.Hosting.Diagnostics", LogLevel.Warning);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();
builder.Services.AddSignalR();

#region Configure Services

var services = builder.Services;

builder.Services.AddSwaggerGen(config =>
{
    config.SwaggerDoc("v1", new OpenApiInfo { Title = "Card Flip Game", Version = "v1" });
});

services.AddDbContext<AppDbContext>(options => options
    .UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), opt => opt
        .EnableRetryOnFailure()
        .UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
    )
    // Ignored because it interferes with the construction of Coalesce IncludeTrees via .Include()
    .ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored))
);

services.AddCoalesce<AppDbContext>();
services.AddScoped<IGameService, GameService>();

services.AddIdentity<ApplicationUser, IdentityRole>(options => {
    options.SignIn.RequireConfirmedAccount = false;
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 4;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>(TokenOptions.DefaultProvider)
    .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<ApplicationUser, IdentityRole>>();

services.AddScoped<ILoginService, LoginService>();

services
    .AddMvc()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
        {
            options.Events.OnRedirectToLogin = c =>
            {
                c.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.FromResult<object>(null!);
            };
        });

#endregion



#region Configure HTTP Pipeline

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseViteDevelopmentServer(c =>
    {
        c.DevServerPort = 5002;
    });

    app.MapCoalesceSecurityOverview("coalesce-security");

    app.Use(async (context, next) =>
    {
        await next.Invoke();
    });
}

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

var containsFileHashRegex = new Regex(@"\.[0-9a-fA-F]{8}\.[^\.]*$", RegexOptions.Compiled);
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // vite puts 8-hex-char hashes before the file extension.
        // Use this to determine if we can send a long-term cache duration.
        if (containsFileHashRegex.IsMatch(ctx.File.Name))
        {
            ctx.Context.Response.GetTypedHeaders().CacheControl =
                new CacheControlHeaderValue { Public = true, MaxAge = TimeSpan.FromDays(30) };
        }
    }
});

// For all requests that aren't to static files, disallow caching by default.
// Individual endpoints may override this.
app.Use(async (context, next) =>
{
    context.Response.GetTypedHeaders().CacheControl =
        new CacheControlHeaderValue { NoCache = true, NoStore = true, };

    await next();
});

app.MapControllers();

// API fallback to prevent serving SPA fallback to 404 hits on API endpoints.
app.Map("/api/{**any}", () => Results.NotFound());

app.MapFallbackToController("Index", "Home");

#endregion



#region Launch

// Initialize/migrate database.
using (var scope = app.Services.CreateScope())
{
    var serviceScope = scope.ServiceProvider;

    app.MapHub<LobbbyHub>("/lobbyHub");
    app.MapHub<RaceGameHub>("/raceGameHub");

    // Run database migrations.
    using var db = serviceScope.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    RoleManager<IdentityRole> roleManager = serviceScope.GetRequiredService<RoleManager<IdentityRole>>();

    foreach (string role in Roles.AllRoles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

app.Run();

#endregion
