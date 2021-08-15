# build environment
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

WORKDIR /source
COPY ./ApplicationCore/ ApplicationCore/.
COPY ./Infrastructure/ Infrastructure/.
COPY ./Web/ Web/.
WORKDIR /source/Web
RUN dotnet restore
RUN dotnet publish -c Release -o /app --no-restore

# runtime envrionment
FROM mcr.microsoft.com/dotnet/aspnet:5.0

WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_URLS http://*:5000
VOLUME [ "/app/database" ]

# switch execute user
RUN useradd appuser
USER appuser

ENTRYPOINT ["dotnet", "InspectionManager.Web.dll"]
