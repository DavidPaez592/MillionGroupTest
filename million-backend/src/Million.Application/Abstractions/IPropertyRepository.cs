using Million.Domain.Common;
using Million.Domain.Entities;
using Million.Application.Models;

namespace Million.Application.Abstractions;

public interface IPropertyRepository
{
    Task<PagedResult<Property>> SearchAsync(PropertyQuery query, CancellationToken ct = default);
    Task<Property?> GetByIdAsync(string id, CancellationToken ct = default);
}

