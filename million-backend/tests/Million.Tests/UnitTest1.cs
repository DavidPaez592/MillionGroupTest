using Million.Application.Services;
using Million.Domain.Entities;

namespace Million.Tests;

/// <summary>
/// Verifica el mapeo de la imagen principal en el DTO del listado.
/// Asegura que se seleccione la primera imagen habilitada.
/// </summary>
public class MappingTests
{
    [Test]
    public void ToListItemDto_Picks_First_Enabled_Image()
    {
        var property = new Property
        {
            Id = "id",
            IdOwner = "owner",
            Name = "Test",
            Address = "Somewhere",
            Price = 123m,
            Images = new[]
            {
                new PropertyImage { Url = "a.jpg", Enabled = false },
                new PropertyImage { Url = "b.jpg", Enabled = true },
                new PropertyImage { Url = "c.jpg", Enabled = true },
            }
        };

        var dto = PropertyService.ToListItemDto(property);

        Assert.That(dto.ImageUrl, Is.EqualTo("b.jpg"));
    }
}
