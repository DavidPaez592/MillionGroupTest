# Dockerfile for Million.Api (.NET 9)

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base
WORKDIR /app

# Copy solution and project files
COPY Million.sln ./
COPY src/Million.Domain/Million.Domain.csproj src/Million.Domain/
COPY src/Million.Application/Million.Application.csproj src/Million.Application/
COPY src/Million.Infrastructure/Million.Infrastructure.csproj src/Million.Infrastructure/
COPY src/Million.Api/Million.Api.csproj src/Million.Api/
COPY tests/Million.Tests/Million.Tests.csproj tests/Million.Tests/

RUN dotnet restore Million.sln

# Copy the rest of the source
COPY . .

# Set the working directory to the API project
WORKDIR /app/src/Million.Api

# Expose the application port
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

# Run the application
CMD ["dotnet", "run", "--no-launch-profile", "--urls", "http://0.0.0.0:8080"]
