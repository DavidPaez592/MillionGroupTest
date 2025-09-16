using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Infrastructure.Documents;

public sealed class OwnerDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;
    [BsonElement("address")]
    public string Address { get; set; } = string.Empty;
    [BsonElement("photo")]
    public string? Photo { get; set; }
    [BsonElement("birthday")]
    public DateTime? Birthday { get; set; }
}

public sealed class PropertyImageDocument
{
    [BsonElement("url")]
    public string Url { get; set; } = string.Empty;
    [BsonElement("enabled")]
    public bool Enabled { get; set; } = true;
}

public sealed class PropertyDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;
    [BsonElement("address")]
    public string Address { get; set; } = string.Empty;
    [BsonElement("price")]
    public decimal Price { get; set; }
    [BsonElement("codeInternal")]
    public string CodeInternal { get; set; } = string.Empty;
    [BsonElement("year")]
    public int Year { get; set; }

    [BsonElement("idOwner")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdOwner { get; set; } = string.Empty;

    [BsonElement("images")]
    public List<PropertyImageDocument> Images { get; set; } = new();

    // Extra fields
    [BsonElement("beds")]
    public int? Beds { get; set; }
    [BsonElement("fullBaths")]
    public int? FullBaths { get; set; }
    [BsonElement("halfBaths")]
    public int? HalfBaths { get; set; }
    [BsonElement("parking")]
    public int? Parking { get; set; }
    [BsonElement("areaSqFt")]
    public int? AreaSqFt { get; set; }
    [BsonElement("dateListed")]
    public DateTime? DateListed { get; set; }
    [BsonElement("description")]
    public string? Description { get; set; }
    [BsonElement("amenities")]
    public List<string>? Amenities { get; set; }
    [BsonElement("wifi")]
    public bool? Wifi { get; set; }
    [BsonElement("datePublished")]
    public DateTime? DatePublished { get; set; }
    [BsonElement("status")]
    public string? Status { get; set; }
}
