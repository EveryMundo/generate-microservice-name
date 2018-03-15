# @everymundo/generate-microservice-name
It generates the microservice name by reading the data from the projects package.json

# Install
npm install @everymundo/generate-microservice-name

# Usage

The function ```getMicroserviceName``` will use your apps *package.json* file in order to
either generate a valid microservice name under the Everymundo Naming Convention or retrieve
the name contained in the ```config.customMicroserviceName```

### Common scenario
*package.json*
```json
  "name": "my-app",
  "version": "1.2.3",
```
*your-app.js*
```js
const { getMicroserviceName } = require('@everymundo/generate-microservice-name');

const myAppName = getMicroserviceName();

console.log(myAppName); // this will print my-app-v1
```

### Namespaced scenario
In a different scenario, with a namespace for example

*package.json*
```json
  "name": "@my-company/my-app-name",
  "version": "2.3.0",
```
*your-app.js*
```js
const { getMicroserviceName } = require('@everymundo/generate-microservice-name');

const myAppName = getMicroserviceName();

console.log(myAppName); // this will print my-app-name-v2
```

### Custom Microservice Name scenario
If, for some special reason, you need a different app name (not common), you can use this mechanism

*package.json*
```json
  "name": "@my-company/my-app-name",
  "version": "2.3.0",
  "config": {
    "customMicroserviceName": "some-other-name-v2",
  }
```
*your-app.js*
```js
const { getMicroserviceName } = require('@everymundo/generate-microservice-name');

const myAppName = getMicroserviceName();

console.log(myAppName); // this will print my-app-name-v2
```
