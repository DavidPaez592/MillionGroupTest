namespace Million.Domain.Entities;

public sealed class Owner
{
    public string Id { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public string Address { get; init; } = string.Empty;
    public string? Photo { get; init; }
    public DateTime? Birthday { get; init; }
}

