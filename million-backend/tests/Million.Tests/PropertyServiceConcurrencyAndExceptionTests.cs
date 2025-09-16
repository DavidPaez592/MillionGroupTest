using Moq;
using Million.Application.Abstractions;
using Million.Application.Models;
using Million.Application.Services;
using Million.Domain.Common;
using Million.Domain.Entities;

namespace Million.Tests;

public sealed class PropertyServiceConcurrencyAndExceptionTests
{
	private readonly Mock<IPropertyRepository> _repoMock = new();

	private PropertyService CreateService() => new(_repoMock.Object);

	[Test]
	public void GetAsync_Throws_TimeoutException_When_Repository_Times_Out()
	{
		// Arrange
		var query = new PropertyQuery { Name = "timeout" };
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ThrowsAsync(new TimeoutException("Repository timeout"));
		var sut = CreateService();

		// Act & Assert
		var ex = Assert.ThrowsAsync<TimeoutException>(() => sut.GetAsync(query));
		Assert.That(ex!.Message, Is.EqualTo("Repository timeout"));
	}

	[Test]
	public void GetByIdAsync_Throws_InvalidOperationException_When_Repository_Fails()
	{
		// Arrange
		_repoMock
			.Setup(r => r.GetByIdAsync("invalid", It.IsAny<CancellationToken>()))
			.ThrowsAsync(new InvalidOperationException("Invalid operation"));
		var sut = CreateService();

		// Act & Assert
		var ex = Assert.ThrowsAsync<InvalidOperationException>(() => sut.GetByIdAsync("invalid"));
		Assert.That(ex!.Message, Is.EqualTo("Invalid operation"));
	}

	[Test]
	public void GetAsync_Handles_Multiple_Concurrent_Requests()
	{
		// Arrange
		var query = new PropertyQuery { Name = "concurrent", Page = 1, PageSize = 5 };
		_repoMock
			.Setup(r => r.SearchAsync(query, It.IsAny<CancellationToken>()))
			.ReturnsAsync(new PagedResult<Property>
			{
				Items = new List<Property>
				{
					new Property { Id = "p1" },
					new Property { Id = "p2" }
				},
				Total = 2,
				Page = 1,
				PageSize = 5
			});
		var sut = CreateService();

		// Act
		var tasks = Enumerable.Range(0, 10)
			.Select(_ => sut.GetAsync(query))
			.ToArray();
		Task.WaitAll(tasks);

		// Assert
		foreach (var task in tasks)
		{
			Assert.That(task.Result.Total, Is.EqualTo(2));
			Assert.That(task.Result.Items, Has.Count.EqualTo(2));
		}
	}
}
