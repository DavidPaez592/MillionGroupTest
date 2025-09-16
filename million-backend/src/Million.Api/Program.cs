using Microsoft.OpenApi.Models;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Infrastructure.Mongo;
using Million.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Options pattern for Mongo settings (env vars: Mongo:ConnectionString, Mongo:Database)
builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("Mongo"));

// DI registrations
builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IPropertyService, PropertyService>();

// CORS for frontend (Next.js on localhost:3000 by default). Override via Cors:AllowedOrigins
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                      ?? new[] { "http://localhost:3000" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Million API", Version = "v1" });
});

// System.Text.Json
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    options.SerializerOptions.WriteIndented = true;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("frontend");

// Health
app.MapGet("/health", () => Results.Ok(new { status = "ok", time = DateTimeOffset.UtcNow }))
   .WithName("Health");

// Properties endpoints (Minimal API)
app.MapGet("/api/properties", async (IPropertyService service, string? name, string? address, decimal? minPrice, decimal? maxPrice, string? sort, int page = 1, int pageSize = 12, CancellationToken ct = default) =>
{
    try
    {
        if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
        {
            return Results.BadRequest(new { error = "minPrice cannot be greater than maxPrice" });
        }

        if (page < 1 || pageSize < 1 || pageSize > 100)
        {
            return Results.BadRequest(new { error = "Invalid pagination. page >= 1, pageSize 1..100" });
        }

        if (!string.IsNullOrWhiteSpace(sort) && sort is not ("priceAsc" or "priceDesc" or "latest"))
        {
            return Results.BadRequest(new { error = "Invalid sort. Use priceAsc, priceDesc or latest" });
        }

        var query = new PropertyQuery { Name = name, Address = address, MinPrice = minPrice, MaxPrice = maxPrice, Sort = sort, Page = page, PageSize = pageSize };
        var result = await service.GetAsync(query, ct);
        return Results.Ok(result);
    }
    catch (Exception ex)
    {
        Console.WriteLine("[API ERROR] " + ex);
        return Results.Problem("Internal error: " + ex.Message);
    }
})
.WithName("GetProperties")
.WithOpenApi(op =>
{
    op.Summary = "Get a paged list of properties with optional filters";
    op.Description = "Filters by name, address and price range. Supports pagination.";
    foreach (var p in op.Parameters)
    {
        if (p.Name == "name") p.Description = "Partial match (case-insensitive) against property name";
        if (p.Name == "address") p.Description = "Partial match (case-insensitive) against address";
        if (p.Name == "minPrice") p.Description = "Minimum price filter";
        if (p.Name == "maxPrice") p.Description = "Maximum price filter";
        if (p.Name == "sort") p.Description = "Sort by priceAsc|priceDesc|latest (default priceDesc)";
        if (p.Name == "page") p.Description = "Page number (>=1)";
        if (p.Name == "pageSize") p.Description = "Items per page (1-100)";
    }
    return op;
});

app.MapGet("/api/properties/{id}", async (IPropertyService service, string id, CancellationToken ct) =>
{
    var item = await service.GetDetailByIdAsync(id, ct);
    return item is null ? Results.NotFound() : Results.Ok(item);
})
.WithName("GetPropertyById")
.WithOpenApi(op =>
{
    op.Summary = "Get a property by id";
    return op;
});

app.Run();
