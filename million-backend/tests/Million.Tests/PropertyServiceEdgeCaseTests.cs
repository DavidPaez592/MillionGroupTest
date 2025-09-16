using Moq;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Domain.Common;
using Million.Domain.Entities;

namespace Million.Tests;

public sealed class PropertyServiceEdgeCaseTests
{
	private readonly Mock<IPropertyRepository> _repoMock = new();

	private PropertyService CreateService() => new(_repoMock.Object);

	[Test]
	public async Task GetAsync_Handles_Zero_PageSize()
	{
		// Arrange
		var query = new PropertyQuery { Name = "test", Page = 1, PageSize = 0 };
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ReturnsAsync(new PagedResult<Property>
			{
				Items = new List<Property>(),
				Total = 0,
				Page = 1,
				PageSize = 0
			});
		var sut = CreateService();

		// Act
		var result = await sut.GetAsync(query);

		// Assert
		Assert.That(result.PageSize, Is.EqualTo(0));
		Assert.That(result.Items, Is.Empty);
	}

	[Test]
	public void ToListItemDto_Handles_Property_With_Duplicate_Images()
	{
		// Arrange
		var images = new List<PropertyImage>
		{
			new() { Url = "https://img/1.jpg", Enabled = true },
			new() { Url = "https://img/1.jpg", Enabled = true }
		};
		var entity = new Property { Id = "test", Images = images };

		// Act
		var dto = PropertyService.ToListItemDto(entity);

		// Assert
		Assert.That(dto.Images, Has.Count.EqualTo(2));
		Assert.That(dto.Images[0], Is.EqualTo("https://img/1.jpg"));
		Assert.That(dto.Images[1], Is.EqualTo("https://img/1.jpg"));
	}

	[Test]
	public async Task GetByIdAsync_Returns_Null_For_Empty_Id()
	{
		// Arrange
		var sut = CreateService();

		// Act
		var result = await sut.GetByIdAsync(string.Empty);

		// Assert
		Assert.That(result, Is.Null);
	}

	[Test]
	public async Task GetDetailByIdAsync_Handles_Property_With_No_Images()
	{
		// Arrange
		var entity = new Property { Id = "test", Images = new List<PropertyImage>() };
		_repoMock.Setup(r => r.GetByIdAsync("test", It.IsAny<CancellationToken>()))
			.ReturnsAsync(entity);
		var sut = CreateService();

		// Act
		var detail = await sut.GetDetailByIdAsync("test");

		// Assert
		Assert.That(detail, Is.Not.Null);
		Assert.That(detail!.Images, Is.Empty);
		Assert.That(detail.ImageUrl, Is.Null);
	}
}
