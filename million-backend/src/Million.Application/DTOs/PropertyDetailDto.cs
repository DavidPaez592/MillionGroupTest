namespace Million.Application.DTOs;

// DTO de detalle para /api/properties/{id}
public sealed class PropertyDetailDto
{
    public string? Description { get; init; }
    public int? Beds { get; init; }
    public int? FullBaths { get; init; }
    public int? HalfBaths { get; init; }
    public int? Parking { get; init; }
    public int? AreaSqFt { get; init; }
    public bool? Wifi { get; init; }
    public string Id { get; init; } = string.Empty;
    public string IdOwner { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public string? ImageUrl { get; init; }
    public IReadOnlyList<string>? Images { get; init; }
    public int Year { get; init; }
    public string CodeInternal { get; init; } = string.Empty;
    public IReadOnlyList<string>? Amenities { get; init; }
}
