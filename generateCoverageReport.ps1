$resultsDirectory = "testresult"
$targetDirectory = "coveragereport"
$reportFilePath = $resultsDirectory + "\*\coverage.cobertura.xml"

if (Test-Path $resultsDirectory) {
    Remove-Item $resultsDirectory -Recurse
}

if (Test-Path $targetDirectory) {
    Remove-Item $targetDirectory -Recurse
}

dotnet test `
    --collect "XPlat Code Coverage" `
    -r $resultsDirectory `
    --no-build
reportgenerator `
    -reports:$reportFilePath `
    -targetdir:$targetDirectory `
    -reporttypes:Html
