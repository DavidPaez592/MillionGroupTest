namespace Million.Application.DTOs;

// DTO usado en el listado con una sola imagen
public sealed class PropertyListItemDto
{
    public string Id { get; init; } = string.Empty;
    public string IdOwner { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public decimal Price { get; init; }
    public string? ImageUrl { get; init; }
    public IReadOnlyList<string>? Images { get; init; }
    public string? Status { get; init; }
    public int? Beds { get; init; }
    public int? FullBaths { get; init; }
    public int? HalfBaths { get; init; }
    public int? AreaSqFt { get; init; }
    public DateTime? DateListed { get; init; }
    public IReadOnlyList<string>? Amenities { get; init; }
}
