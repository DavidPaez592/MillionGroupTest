using MongoDB.Driver;
using MongoDB.Bson;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Domain.Common;
using Million.Domain.Entities;
using Million.Infrastructure.Documents;
using Million.Infrastructure.Mongo;

namespace Million.Infrastructure.Repositories;

/// <summary>
/// MongoDB-backed repository for querying properties with filter and pagination support.
/// Keeps data access concerns isolated from application logic.
/// </summary>
public sealed class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<PropertyDocument> _collection;

    public PropertyRepository(MongoDbContext context)
    {
        _collection = context.Database.GetCollection<PropertyDocument>("properties");
    }

    public async Task<PagedResult<Property>> SearchAsync(PropertyQuery query, CancellationToken ct = default)
    {
        var builder = Builders<PropertyDocument>.Filter;
        var filters = new List<FilterDefinition<PropertyDocument>>();

        if (!string.IsNullOrWhiteSpace(query.Name))
        {
            filters.Add(builder.Regex(x => x.Name, new BsonRegularExpression(query.Name, "i")));
        }
        if (!string.IsNullOrWhiteSpace(query.Address))
        {
            filters.Add(builder.Regex(x => x.Address, new BsonRegularExpression(query.Address, "i")));
        }
        if (query.MinPrice.HasValue)
        {
            filters.Add(builder.Gte(x => x.Price, query.MinPrice.Value));
        }
        if (query.MaxPrice.HasValue)
        {
            filters.Add(builder.Lte(x => x.Price, query.MaxPrice.Value));
        }

        var filter = filters.Count > 0 ? builder.And(filters) : builder.Empty;

        var find = _collection.Find(filter);
        var total = await find.CountDocumentsAsync(ct);

        var page = Math.Max(1, query.Page);
        var pageSize = Math.Clamp(query.PageSize, 1, 100);

        // Sorting
        var sort = query.Sort?.ToLowerInvariant();
        if (sort == "priceasc")
            find = find.SortBy(x => x.Price);
        else if (sort == "latest")
            find = find.SortByDescending(x => x.Year);
        else
            find = find.SortByDescending(x => x.Price); // default

        var docs = await find
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync(ct);

        var items = docs.Select(MapToDomain).ToList();

        return new PagedResult<Property>
        {
            Items = items,
            Total = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<Property?> GetByIdAsync(string id, CancellationToken ct = default)
    {
        var doc = await _collection.Find(x => x.Id == id).FirstOrDefaultAsync(ct);
        return doc is null ? null : MapToDomain(doc);
    }

    private static Property MapToDomain(PropertyDocument d) => new()
    {
        Id = d.Id,
        Name = d.Name,
        Address = d.Address,
        Price = d.Price,
        CodeInternal = d.CodeInternal,
        Year = d.Year,
        IdOwner = d.IdOwner,
        Images = d.Images.Select(i => new PropertyImage { Url = i.Url, Enabled = i.Enabled }).ToList(),
        Beds = d.Beds,
        FullBaths = d.FullBaths,
        HalfBaths = d.HalfBaths,
        Parking = d.Parking,
        AreaSqFt = d.AreaSqFt,
        DateListed = d.DateListed,
        Description = d.Description,
        Amenities = d.Amenities,
        Wifi = d.Wifi
    };
}
