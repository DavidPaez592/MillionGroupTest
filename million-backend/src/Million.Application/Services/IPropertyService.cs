using Million.Application.DTOs;
using Million.Application.Models;
using Million.Domain.Common;

namespace Million.Application.Services;

public interface IPropertyService
{
    Task<PagedResult<PropertyListItemDto>> GetAsync(PropertyQuery query, CancellationToken ct = default);
    Task<PropertyListItemDto?> GetByIdAsync(string id, CancellationToken ct = default);
    Task<PropertyDetailDto?> GetDetailByIdAsync(string id, CancellationToken ct = default);
}
