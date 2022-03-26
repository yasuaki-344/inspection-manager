 docker run --rm \
  -u `id -u $USER` \
  -v ${PWD}/docs:/local \
  -v ${PWD}/src/ClientApp/src:/out \
   openapitools/openapi-generator-cli:v5.4.0 generate \
  -i /local/swagger.yml \
  -g typescript-fetch \
  -o /out/typescript-fetch \
  --additional-properties=modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true
