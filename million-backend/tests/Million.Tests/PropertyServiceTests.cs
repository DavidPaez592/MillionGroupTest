using Moq;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Domain.Common;
using Million.Domain.Entities;

namespace Million.Tests;

public sealed class PropertyServiceTests
{
	private readonly Mock<IPropertyRepository> _repoMock = new();

	private PropertyService CreateService() => new(_repoMock.Object);

	private static Property CreateProperty(
		string id = "p1",
		bool includeImages = true,
		bool firstImageEnabled = true,
		int enabledImages = 2,
		int totalImages = 3)
	{
		var images = new List<PropertyImage>();
		if (includeImages)
		{
			for (var i = 0; i < totalImages; i++)
			{
				images.Add(new PropertyImage
				{
					Url = $"https://img/{id}-{i}.jpg",
					Enabled = i < enabledImages ? (i == 0 ? firstImageEnabled : true) : false
				});
			}
		}

		return new Property
		{
			Id = id,
			IdOwner = $"owner-{id}",
			Name = $"Property {id}",
			Address = $"Address {id}",
			Price = 1000 + id.Length,
			CodeInternal = $"code-{id}",
			Year = 2020,
			Images = images,
			Beds = 3,
			FullBaths = 2,
			HalfBaths = 1,
			AreaSqFt = 1200,
			DateListed = DateTime.UtcNow.Date,
			Amenities = new List<string> { "pool", "gym" },
			Description = "Nice place",
			Wifi = true
		};
	}

	[Test]
	public async Task GetAsync_Maps_PagedResult_And_Items()
	{
		// Arrange
		var query = new PropertyQuery { Name = "prop", Page = 2, PageSize = 5 };
		var entities = new List<Property>
		{
			CreateProperty("p1"),
			CreateProperty("p2")
		};
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ReturnsAsync(new PagedResult<Property>
			{
				Items = entities,
				Total = 42,
				Page = 2,
				PageSize = 5
			});
		var sut = CreateService();

		// Act
		var result = await sut.GetAsync(query);

		// Assert
		Assert.That(result.Total, Is.EqualTo(42));
		Assert.That(result.Page, Is.EqualTo(2));
		Assert.That(result.PageSize, Is.EqualTo(5));
		Assert.That(result.Items, Has.Count.EqualTo(2));
		var first = result.Items[0];
		Assert.Multiple(() =>
		{
			Assert.That(first.Id, Is.EqualTo("p1"));
			Assert.That(first.Name, Does.StartWith("Property"));
			Assert.That(first.ImageUrl, Is.Not.Null);
			Assert.That(first.Images, Is.Not.Null);
			Assert.That(first.Images!.Count, Is.GreaterThan(0));
		});
		_repoMock.Verify(r => r.SearchAsync(query, It.IsAny<CancellationToken>()), Times.Once);
	}

	[Test]
	public async Task GetByIdAsync_Returns_Dto_When_Found()
	{
		// Arrange
		var entity = CreateProperty("p5");
		_repoMock.Setup(r => r.GetByIdAsync("p5", It.IsAny<CancellationToken>()))
			.ReturnsAsync(entity);
		var sut = CreateService();

		// Act
		var dto = await sut.GetByIdAsync("p5");

		// Assert
		Assert.That(dto, Is.Not.Null);
		Assert.That(dto!.Id, Is.EqualTo("p5"));
		Assert.That(dto.ImageUrl, Is.Not.Null);
		_repoMock.Verify(r => r.GetByIdAsync("p5", It.IsAny<CancellationToken>()), Times.Once);
	}

	[Test]
	public async Task GetByIdAsync_Returns_Null_When_NotFound()
	{
		_repoMock.Setup(r => r.GetByIdAsync("missing", It.IsAny<CancellationToken>()))
			.ReturnsAsync((Property?)null);
		var sut = CreateService();

		var dto = await sut.GetByIdAsync("missing");

		Assert.That(dto, Is.Null);
	}

	[Test]
	public async Task GetDetailByIdAsync_Maps_All_Fields_And_Enabled_Images()
	{
		// Arrange: primera imagen deshabilitada para forzar fallback a primera habilitada
		var entity = CreateProperty(
			id: "p9",
			includeImages: true,
			firstImageEnabled: false,
			enabledImages: 3,
			totalImages: 4);
		_repoMock.Setup(r => r.GetByIdAsync("p9", It.IsAny<CancellationToken>()))
			.ReturnsAsync(entity);
		var sut = CreateService();

		// Act
		var detail = await sut.GetDetailByIdAsync("p9");

		// Assert
		Assert.That(detail, Is.Not.Null);
		Assert.Multiple(() =>
		{
			Assert.That(detail!.Id, Is.EqualTo("p9"));
			Assert.That(detail.IdOwner, Does.StartWith("owner-"));
			Assert.That(detail.Images, Is.Not.Null);
			Assert.That(detail.Images!.Count, Is.EqualTo(2)); // solo habilitadas
			Assert.That(detail.ImageUrl, Is.Not.Null); // primera habilitada
			Assert.That(detail.Beds, Is.EqualTo(3));
			Assert.That(detail.FullBaths, Is.EqualTo(2));
			Assert.That(detail.HalfBaths, Is.EqualTo(1));
			Assert.That(detail.AreaSqFt, Is.EqualTo(1200));
			Assert.That(detail.Wifi, Is.True);
		});
	}

	[Test]
	public async Task GetDetailByIdAsync_Returns_Null_When_NotFound()
	{
		_repoMock.Setup(r => r.GetByIdAsync("none", It.IsAny<CancellationToken>()))
			.ReturnsAsync((Property?)null);
		var sut = CreateService();

		var detail = await sut.GetDetailByIdAsync("none");

		Assert.That(detail, Is.Null);
	}

	[Test]
	public void ToListItemDto_Picks_First_Enabled_Image_And_Limits_To_12()
	{
		// Arrange: 15 imágenes, 13 habilitadas -> Images debe tener 12
		var images = Enumerable.Range(0, 15)
			.Select(i => new PropertyImage { Url = $"u{i}", Enabled = i != 0 && i <= 13 })
			.ToList();
		var entity = new Property { Id = "x", Images = images };

		// Act
		var dto = PropertyService.ToListItemDto(entity);

		// Assert
		Assert.That(dto.Images, Is.Not.Null);
		Assert.That(dto.Images!.Count, Is.EqualTo(12));
		Assert.That(dto.ImageUrl, Is.EqualTo("u1")); // primera habilitada
	}

	[Test]
	public void ToListItemDto_Falls_Back_To_First_When_No_Enabled()
	{
		var images = new List<PropertyImage>
		{
			new() { Url = "a", Enabled = false },
			new() { Url = "b", Enabled = false }
		};
		var entity = new Property { Id = "y", Images = images };

		var dto = PropertyService.ToListItemDto(entity);

		Assert.That(dto.ImageUrl, Is.EqualTo("a"));
	}

	[Test]
	public void ToListItemDto_ImageUrl_Null_When_No_Images()
	{
		var entity = new Property { Id = "z", Images = Array.Empty<PropertyImage>() };

		var dto = PropertyService.ToListItemDto(entity);

		Assert.That(dto.ImageUrl, Is.Null);
		Assert.That(dto.Images, Is.Not.Null);
		Assert.That(dto.Images!.Count, Is.EqualTo(0));
	}
}
