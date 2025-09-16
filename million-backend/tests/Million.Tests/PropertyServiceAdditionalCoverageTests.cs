using Moq;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Domain.Common;
using Million.Domain.Entities;

namespace Million.Tests;

public sealed class PropertyServiceAdditionalCoverageTests
{
	private readonly Mock<IPropertyRepository> _repoMock = new();

	private PropertyService CreateService() => new(_repoMock.Object);

	[Test]
	public async Task GetAsync_Handles_Large_Number_Of_Properties()
	{
		// Arrange
		var query = new PropertyQuery { Name = "large", Page = 1, PageSize = 1000 };
		var entities = Enumerable.Range(1, 1000)
			.Select(i => new Property { Id = $"p{i}", Name = $"Property {i}" })
			.ToList();
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ReturnsAsync(new PagedResult<Property>
			{
				Items = entities,
				Total = 1000,
				Page = 1,
				PageSize = 1000
			});
		var sut = CreateService();

		// Act
		var result = await sut.GetAsync(query);

		// Assert
		Assert.That(result.Items, Has.Count.EqualTo(1000));
		Assert.That(result.Total, Is.EqualTo(1000));
	}

	[Test]
	public void GetByIdAsync_Throws_Exception_For_SQL_Injection_Attempt()
	{
		// Arrange
		var maliciousId = "1; DROP TABLE Properties;";
		_repoMock
			.Setup(r => r.GetByIdAsync(maliciousId, It.IsAny<CancellationToken>()))
			.ThrowsAsync(new ArgumentException("Invalid ID format"));
		var sut = CreateService();

		// Act & Assert
		var ex = Assert.ThrowsAsync<ArgumentException>(() => sut.GetByIdAsync(maliciousId));
		Assert.That(ex!.Message, Is.EqualTo("Invalid ID format"));
	}

	[Test]
	public void Constructor_Throws_Exception_When_Repository_Is_Not_Configured()
	{
		// Act & Assert
		Assert.Throws<ArgumentNullException>(() => new PropertyService(null!));
	}
}
