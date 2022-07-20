const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env'),
});

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
const filePath = path.resolve(process.cwd(), './src/api');
generateApi({
  name: 'api.ts',
  output: filePath,
  url: process.env.REACT_APP_SWAGGER_ENDPOINT,
  templates: filePath,
  httpClientType: 'fetch',
  defaultResponseAsSuccess: false,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: false,
  extractRequestBody: false,
  prettier: { // By default prettier config is load from your project
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'all',
    parser: 'typescript',
  },
  defaultResponseType: 'void',
  singleHttpClient: true,
  cleanOutput: false,
  enumNamesAsValues: false,
  moduleNameFirstTag: false,
  generateUnionEnums: false,
  extraTemplates: [],
}).then(() => {
  const file = fs.readFileSync(path.resolve(filePath, 'api.ts')).toString();
  const newFile = file.replace(
    '...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),',
    '...(type && type !== ContentType.FormData ? { "Content-Type": type } : {"Content-Type": ContentType.Json}),'
  );
  fs.writeFileSync(path.join(filePath, 'api.ts'), newFile);
})
  .catch(e => console.error(e));
