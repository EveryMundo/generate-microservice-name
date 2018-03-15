// this will set the global.__rootdir in cases it is not yet set
require('@everymundo/global-root-dir').setGlobalRootDir();

const { getPackageJSON } = require('./lib/get-package-json');

const nameRegExp = /^[-\w]+-v\d+$/;

const generateMicroserviceNameFrom = ({ name, version }) => {
  const majorVersionNumber = +version.substr(0, version.indexOf('.'));
  const cleanName          = name.substr(name.lastIndexOf('/') + 1);

  const appName = `${cleanName}-v${majorVersionNumber}`;

  return appName;
};


const itHasAValidCustomMicroserviceName = ({ config } = {}) =>
  Boolean(config) && nameRegExp.test(config.customMicroserviceName);


const getMicroserviceName = () => {
  const appPackageJson = getPackageJSON();

  if (itHasAValidCustomMicroserviceName(appPackageJson)) {
    return appPackageJson.config.customMicroserviceName;
  }

  return generateMicroserviceNameFrom(appPackageJson);
};

module.exports = {
  generateMicroserviceNameFrom,
  getMicroserviceName,
  itHasAValidCustomMicroserviceName,
  getPackageJSON,
  nameRegExp,
};
