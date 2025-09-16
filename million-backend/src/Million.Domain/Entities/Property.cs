namespace Million.Domain.Entities;

public sealed class Property
{
    public string Id { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public string CodeInternal { get; init; } = string.Empty;
    public int Year { get; init; }
    public string IdOwner { get; init; } = string.Empty;
    public IReadOnlyList<PropertyImage> Images { get; init; } = Array.Empty<PropertyImage>();
    public string? Description { get; init; }
    public string? Status { get; init; }
    public int? Beds { get; init; }
    public int? FullBaths { get; init; }
    public int? HalfBaths { get; init; }
    public int? Parking { get; init; }
    public int? AreaSqFt { get; init; }
    public DateTime? DateListed { get; init; }
    public IReadOnlyList<string>? Amenities { get; init; }
    public bool? Wifi { get; init; }
}
