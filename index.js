// this will set the global.__rootdir in cases it is not yet set
require('@everymundo/global-root-dir').setGlobalRootDir();

const { getPackageJSON } = require('./lib/get-package-json');

const nameRegExp = /^[-\w]+-v\d+$/;

const getMajorVersionNumber = (appPackageJson = getPackageJSON()) => {
  const { version } = appPackageJson;
  return +version.substr(0, version.indexOf('.'));
};

const getPrefixedMajorVersionNumber = (appPackageJson = getPackageJSON()) => {
  const { version } = appPackageJson;
  const majorVersionNumber = getMajorVersionNumber({ version });
  return `v${majorVersionNumber}`;
};

const getCleanAppName = (appPackageJson = getPackageJSON()) => {
  const { name } = appPackageJson;
  return name.substr(name.lastIndexOf('/') + 1);
};

const generateMicroserviceNameFrom = ({ name, version }) => {
  // const majorVersionNumber = +version.substr(0, version.indexOf('.'));
  const prefixedMajorVersionNumber = getPrefixedMajorVersionNumber({ version });
  // const cleanName          = name.substr(name.lastIndexOf('/') + 1);
  const cleanName          = getCleanAppName({ name });

  // const appName = `${cleanName}-v${majorVersionNumber}`;
  const appName = `${cleanName}-${prefixedMajorVersionNumber}`;

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
  getPrefixedMajorVersionNumber,
  getMajorVersionNumber,
  getCleanAppName,
  generateMicroserviceNameFrom,
  getMicroserviceName,
  itHasAValidCustomMicroserviceName,
  getPackageJSON,
  nameRegExp,
};
