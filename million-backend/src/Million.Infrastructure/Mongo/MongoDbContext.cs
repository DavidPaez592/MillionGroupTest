using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Million.Infrastructure.Mongo;

public sealed class MongoDbContext
{
    public IMongoDatabase Database { get; }

    public MongoDbContext(IOptions<MongoSettings> options)
    {
        var settings = options.Value;
        if (string.IsNullOrWhiteSpace(settings.ConnectionString))
        {
            // Fallback al entorno por defecto (matching docker-compose seed)
            settings.ConnectionString = "mongodb://million:millionpw@localhost:27017";
        }

        var client = new MongoClient(settings.ConnectionString);
        Database = client.GetDatabase(string.IsNullOrWhiteSpace(settings.Database) ? "million" : settings.Database);
    }
}

