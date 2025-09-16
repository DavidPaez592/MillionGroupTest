namespace Million.Infrastructure.Mongo;

public sealed class MongoSettings
{
    public string ConnectionString { get; set; } = string.Empty;
    public string Database { get; set; } = "million";
}

