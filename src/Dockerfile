FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs
RUN npm install --global yarn

WORKDIR /source
COPY ./ApplicationCore/ ApplicationCore/.
COPY ./Infrastructure/ Infrastructure/.
COPY ./Web/ Web/.
WORKDIR /source/Web
RUN dotnet restore
RUN dotnet publish -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0

WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_URLS http://*:5000
VOLUME [ "/app/database" ]

# switch execute user
RUN useradd appuser
USER appuser

ENTRYPOINT ["dotnet", "InspectionManager.Web.dll"]
