using Moq;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Domain.Common;
using Million.Domain.Entities;

namespace Million.Tests;

public sealed class PropertyServiceAdditionalTests
{
	private readonly Mock<IPropertyRepository> _repoMock = new();

	private PropertyService CreateService() => new(_repoMock.Object);

	[Test]
	public async Task GetAsync_Returns_Empty_When_No_Results()
	{
		// Arrange
		var query = new PropertyQuery { Name = "nonexistent", Page = 1, PageSize = 10 };
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ReturnsAsync(new PagedResult<Property>
			{
				Items = new List<Property>(),
				Total = 0,
				Page = 1,
				PageSize = 10
			});
		var sut = CreateService();

		// Act
		var result = await sut.GetAsync(query);

		// Assert
		Assert.That(result.Total, Is.EqualTo(0));
		Assert.That(result.Items, Is.Empty);
	}

	[Test]
	public void ToListItemDto_Handles_Property_With_No_Name()
	{
		// Arrange
		var entity = new Property { Id = "test", Name = string.Empty, Images = new List<PropertyImage>() };

		// Act
		var dto = PropertyService.ToListItemDto(entity);

		// Assert
		Assert.That(dto.Name, Is.Empty);
	}

	[Test]
	public void ToListItemDto_Handles_Property_With_No_Amenities()
	{
		// Arrange
		var entity = new Property { Id = "test", Amenities = null };

		// Act
		var dto = PropertyService.ToListItemDto(entity);

		// Assert
		Assert.That(dto.Amenities, Has.Count.EqualTo(0));
	}

	[Test]
	public void GetByIdAsync_Throws_Exception_When_Repository_Fails()
	{
		// Arrange
		_repoMock
			.Setup(r => r.GetByIdAsync("error", It.IsAny<CancellationToken>()))
			.ThrowsAsync(new Exception("Repository failure"));
		var sut = CreateService();

		// Act & Assert
		var ex = Assert.ThrowsAsync<Exception>(() => sut.GetByIdAsync("error"));
		Assert.That(ex!.Message, Is.EqualTo("Repository failure"));
	}
}
