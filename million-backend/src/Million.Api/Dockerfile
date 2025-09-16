# Multi-stage Dockerfile for Million.Api (.NET 9)

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution and project files first to leverage Docker layer caching
COPY Million.sln ./
COPY src/Million.Domain/Million.Domain.csproj src/Million.Domain/
COPY src/Million.Application/Million.Application.csproj src/Million.Application/
COPY src/Million.Infrastructure/Million.Infrastructure.csproj src/Million.Infrastructure/
COPY src/Million.Api/Million.Api.csproj src/Million.Api/
COPY tests/Million.Tests/Million.Tests.csproj tests/Million.Tests/

RUN dotnet restore Million.sln

# Copy the rest of the source
COPY . .

RUN dotnet publish src/Million.Api/Million.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Million.Api.dll"]
