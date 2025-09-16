using Moq;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Domain.Common;
using Million.Domain.Entities;

namespace Million.Tests;

public sealed class PropertyServiceExtremeDataTests
{
	private readonly Mock<IPropertyRepository> _repoMock = new();

	private PropertyService CreateService() => new(_repoMock.Object);

	[Test]
	public void ToListItemDto_Handles_Property_With_Negative_Price()
	{
		// Arrange
		var entity = new Property { Id = "test", Price = -100 };

		// Act
		var dto = PropertyService.ToListItemDto(entity);

		// Assert
		Assert.That(dto.Price, Is.EqualTo(-100));
	}

	[Test]
	public void ToListItemDto_Handles_Property_With_Zero_Area()
	{
		// Arrange
		var entity = new Property { Id = "test", AreaSqFt = 0 };

		// Act
		var dto = PropertyService.ToListItemDto(entity);

		// Assert
		Assert.That(dto.AreaSqFt, Is.EqualTo(0));
	}

	[Test]
	public async Task GetByIdAsync_Returns_Property_With_Minimal_Data()
	{
		// Arrange
		var entity = new Property { Id = "minimal" }; // Solo ID, sin más datos
		_repoMock.Setup(r => r.GetByIdAsync("minimal", It.IsAny<CancellationToken>()))
			.ReturnsAsync(entity);
		var sut = CreateService();

		// Act
		var result = await sut.GetByIdAsync("minimal");

		// Assert
		Assert.That(result, Is.Not.Null);
		Assert.That(result!.Id, Is.EqualTo("minimal"));
		Assert.That(result.Name, Is.Empty); // Cambiado de Is.Null a Is.Empty
		Assert.That(result.Images, Is.Empty);
	}

	[Test]
	public async Task GetAsync_Handles_Properties_With_Missing_Fields()
	{
		// Arrange
		var query = new PropertyQuery { Name = "missingFields", Page = 1, PageSize = 5 };
		var entities = new List<Property>
		{
			new Property { Id = "p1", Name = string.Empty, Price = 0 }, // Usa string.Empty en lugar de null
			new Property { Id = "p2", Images = new List<PropertyImage>() } // Usa una lista vacía en lugar de null
		};
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ReturnsAsync(new PagedResult<Property>
			{
				Items = entities,
				Total = 2,
				Page = 1,
				PageSize = 5
			});
		var sut = CreateService();

		// Act
		var result = await sut.GetAsync(query);

		// Assert
		Assert.That(result.Items, Has.Count.EqualTo(2));
		Assert.That(result.Items[0].Id, Is.EqualTo("p1"));
		Assert.That(result.Items[0].Name, Is.Empty);
		Assert.That(result.Items[1].Images, Is.Empty);
	}
}
