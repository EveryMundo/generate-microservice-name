'require strict';

/* eslint-disable no-unused-expressions */

const
  sinon = require('sinon'),
  path  = require('path'),
  cleanrequire = require('@everymundo/cleanrequire'),
  { expect } = require('chai');

require('@everymundo/global-root-dir').setGlobalRootDir(path.dirname(__dirname));

describe('index.js', () => {
  let box;
  beforeEach(() => { box = sinon.sandbox.create(); });

  // retores the sandbox
  afterEach(() => { box.restore(); });

  describe('#getPackageJSON', () => {
    it('should return this package.json', () => {
      const { getPackageJSON } = require('../index');
      
      const expected = require('../package.json');
      const res = getPackageJSON();

      expect(res).to.equal(expected);
    });
  });

  describe('#generateMicroserviceNameFrom', () => {
    context('when name has a workspace like @everymundo/the-name', () => {
      it('should return the correct generated name', () => {
        const { generateMicroserviceNameFrom } = require('../index');
        
        const input = { name: '@namespace/app-name', version: '2.3.4' };
        const res = generateMicroserviceNameFrom(input);
        const expected = 'app-name-v2';
        
        expect(res).to.equal(expected);
      });
    });

    context('when name does NOT HAVE a workspace', () => {
      it('should return the correct generated name', () => {
        const { generateMicroserviceNameFrom } = require('../index');

        const input = { name: 'some-app-name', version: '1.2.3.4' };
        const res = generateMicroserviceNameFrom(input);
        const expected = 'some-app-name-v1';

        expect(res).to.equal(expected);
      });
    });
  });

  describe('#itHasAValidCustomMicroserviceName', () => {
    const { itHasAValidCustomMicroserviceName } = require('../index');

    context('when it DOES NOT have a custom name', () => {
      it('should return false', () => {
        const res = itHasAValidCustomMicroserviceName();

        expect(res).to.be.false;
      });

      it('should return false', () => {
        const input = {};
        const res = itHasAValidCustomMicroserviceName(input);

        expect(res).to.be.false;
      });

      it('should return false', () => {
        const input = {config: {}};
        const res = itHasAValidCustomMicroserviceName(input);

        expect(res).to.be.false;
      });
    });

    context('when it has a custom name', () => {
      context('and it is Valid', () => {
        it('should return true', () => {
          const input = { config: {
            customMicroserviceName: 'app-name-v2',
          } };

          const res = itHasAValidCustomMicroserviceName(input);

          expect(res).to.be.true;
        });
      });

      context('but it is INVALID', () => {
        it('should return false', () => {
          const input = {
            config: {
              customMicroserviceName: 'this is not a valid name',
            }
          };

          const res = itHasAValidCustomMicroserviceName(input);

          expect(res).to.be.false;
        });
      });
    });
  });

  describe('#getMicroserviceName', () => {
    const packageLib = require('../lib/get-package-json');

    context('when it DOES NOT have a custom name', () => {
      beforeEach(() => {
        box.stub(packageLib, 'getPackageJSON')
          .callsFake(() => ({name: 'my-app', version: '1.2.0'}));
      });

      it('should return my-app-v1', () => {
        const { getMicroserviceName } = cleanrequire('../');
        const res = getMicroserviceName();

        expect(res).to.equal('my-app-v1');
      });
    });

    context('when it has a custom name', () => {
      context('and it is Valid', () => {
        beforeEach(() => {
          const packageObject = {
            name: 'my-app',
            version: '1.2.0',
            config: {
              customMicroserviceName: 'my-custom-name-v2'
            } };
          box.stub(packageLib, 'getPackageJSON')
            .callsFake(() => packageObject);
        });

        it('should return the value of config.customMicroserviceName', () => {
          const { getMicroserviceName } = cleanrequire('../');
          const res = getMicroserviceName();

          expect(res).to.equal('my-custom-name-v2');
        });
      });

      context('but it is INVALID', () => {
        beforeEach(() => {
          const packageObject = {
            name: 'my-app',
            version: '1.2.0',
            config: {
              customMicroserviceName: 'my-custom-name'
            }
          };
          box.stub(packageLib, 'getPackageJSON')
            .callsFake(() => packageObject);
        });

        it('should return the value compose the name', () => {
          const { getMicroserviceName } = cleanrequire('../');
          const res = getMicroserviceName();

          expect(res).to.equal('my-app-v1');
        });
      });
    });
  });
});
