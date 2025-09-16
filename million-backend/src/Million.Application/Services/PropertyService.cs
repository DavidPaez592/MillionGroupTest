using Million.Application.Abstractions;
using Million.Application.DTOs;
using Million.Application.Models;
using Million.Domain.Common;

namespace Million.Application.Services;

/// <summary>
/// Application service that orchestrates property queries and maps domain entities
/// into lightweight DTOs required by the API and UI.
/// </summary>
public sealed class PropertyService(IPropertyRepository repository) : IPropertyService
{
    private readonly IPropertyRepository _repository = repository;

    public async Task<PagedResult<PropertyListItemDto>> GetAsync(PropertyQuery query, CancellationToken ct = default)
    {
        var result = await _repository.SearchAsync(query, ct);

        var items = result.Items.Select(ToListItemDto).ToList();
        return new PagedResult<PropertyListItemDto>
        {
            Items = items,
            Total = result.Total,
            Page = result.Page,
            PageSize = result.PageSize
        };
    }

    public async Task<PropertyListItemDto?> GetByIdAsync(string id, CancellationToken ct = default)
    {
        var entity = await _repository.GetByIdAsync(id, ct);
        return entity is null ? null : ToListItemDto(entity);
    }

    public async Task<PropertyDetailDto?> GetDetailByIdAsync(string id, CancellationToken ct = default)
    {
        var entity = await _repository.GetByIdAsync(id, ct);
        if (entity is null) return null;
        return new PropertyDetailDto
        {
            Id = entity.Id,
            IdOwner = entity.IdOwner,
            Name = entity.Name,
            Address = entity.Address,
            Price = entity.Price,
            ImageUrl = entity.Images.FirstOrDefault(i => i.Enabled)?.Url ?? entity.Images.FirstOrDefault()?.Url,
            Images = entity.Images.Where(i => i.Enabled).Select(i => i.Url).ToList(),
            Year = entity.Year,
            CodeInternal = entity.CodeInternal,
            Amenities = entity.Amenities,
            Description = entity.Description,
            Beds = entity.Beds,
            FullBaths = entity.FullBaths,
            HalfBaths = entity.HalfBaths,
            Parking = entity.Parking,
            AreaSqFt = entity.AreaSqFt,
            Wifi = entity.Wifi
        };
    }

    // Selecciona la primera imagen habilitada si existe
    /// <summary>
    /// Maps a domain <see cref="Million.Domain.Entities.Property"/> to the list item DTO,
    /// selecting the first enabled image (or the first available one as fallback).
    /// </summary>
    public static PropertyListItemDto ToListItemDto(Million.Domain.Entities.Property p) => new()
    {
        Id = p.Id,
        IdOwner = p.IdOwner,
        Name = p.Name,
        Address = p.Address,
        Price = p.Price,
        ImageUrl = p.Images.FirstOrDefault(i => i.Enabled)?.Url ?? p.Images.FirstOrDefault()?.Url,
        Images = p.Images.Where(i => i.Enabled).Select(i => i.Url).Take(12).ToList(),
        Status = p.Status,
        Beds = p.Beds,
        FullBaths = p.FullBaths,
        HalfBaths = p.HalfBaths,
        AreaSqFt = p.AreaSqFt,
    DateListed = p.DateListed,
    Amenities = p.Amenities
    };
}
