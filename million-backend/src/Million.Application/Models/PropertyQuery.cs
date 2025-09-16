namespace Million.Application.Models;

public sealed class PropertyQuery
{
    public string? Name { get; init; }
    public string? Address { get; init; }
    public decimal? MinPrice { get; init; }
    public decimal? MaxPrice { get; init; }
    // sort values: priceAsc | priceDesc (default)
    public string? Sort { get; init; }
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
}
