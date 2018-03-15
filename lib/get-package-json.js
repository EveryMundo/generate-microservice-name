require('@everymundo/global-root-dir').setGlobalRootDir();

const path = require('path');

const getPackageJSON = () => require(path.join(global.__rootdir, 'package.json'));

module.exports = { getPackageJSON };