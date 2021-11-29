# build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build

RUN apk update && apk add --no-cache nodejs npm

WORKDIR /source
COPY ./ApplicationCore/ ApplicationCore/.
COPY ./Infrastructure/ Infrastructure/.
COPY ./Web/ Web/.
WORKDIR /source/Web
RUN dotnet restore
RUN dotnet publish -c Release -o /app --no-restore -r linux-musl-x64 --self-contained

# runtime envrionment
FROM mcr.microsoft.com/dotnet/runtime-deps:6.0-alpine
RUN adduser -D appuser

USER appuser

WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_URLS http://*:5000
VOLUME [ "/app/database" ]

ENTRYPOINT ["./InspectionManager.Web"]
