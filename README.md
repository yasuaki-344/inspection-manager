# inspection-manager

![build status](https://github.com/yasuaki-344/inspection-manager/actions/workflows/dotnet.yml/badge.svg) ![security status](https://github.com/yasuaki-344/inspection-manager/actions/workflows/codeql-analysis.yml/badge.svg)

inspection-manager is a web application to create, manage, export inspection items.

inspection-managerは点検情報を作成・管理・出力するWebアプリケーションです.

## Feature

* Edit inspection item.
  点検情報の編集
* Export inspection item data to excel (.xlsx) file.
  Excelファイル(.xlsx)への出力

## Development environment

* [.NET 6](https://dotnet.microsoft.com/download/dotnet/6.0)
* [Node.js](https://nodejs.org/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Usage

### Build

```bash
dotnet build
```

### Launch web application

```bash
dotnet run --project ./src/Web/InspectionManager.Web.csproj
```
