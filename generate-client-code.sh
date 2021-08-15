 docker run --rm \
  -u `id -u $USER` \
  -v ${PWD}/docs:/local \
  openapitools/openapi-generator-cli generate \
  -i /local/swagger.yml \
  -g typescript-fetch \
  -o /local/out/typescript-fetch \
  --additional-properties=modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true
