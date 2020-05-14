'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-modern-typescript:app', () => {
  const baseFiles = [
    '.gitignore',
    'jest.config.js',
    'src/__test__/index.spec.ts',
    'src/index.ts',
    'tsconfig.build.json',
    'tsconfig.json',
  ];

  it('name test', () => {
    const packageName = 'nameTest';
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ packageName })
      .then(() => {
        assert.fileContent(`${packageName}/package.json`, `"name": "${packageName}"`);
      });
  });

  it('basic test', () => {
    const packageName = 'packageName';
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ packageName: packageName })
      .then(() => {
        const assertFiles = baseFiles.map((file) => {
          return packageName + '/' + file;
        });

        assert.file(assertFiles);
      });
  });

  it('with eslint', () => {
    const packageName = 'packageName';
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ packageName: packageName, useEslint: true })
      .then(() => {
        const assertFiles = baseFiles.concat(['.eslintignore', '.eslintrc.js', '.prettierrc.js']).map((file) => {
          return packageName + '/' + file;
        });

        assert.file(assertFiles);
      });
  });

  it('with jest', () => {
    const packageName = 'packageName';
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ packageName: packageName, useJest: true })
      .then(() => {
        const assertFiles = baseFiles.concat(['jest.config.js']).map((file) => {
          return packageName + '/' + file;
        });

        assert.file(assertFiles);
      });
  });
});
