"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-modern-typescript:app", () => {
  const allFile = [
    "configs/base.json",
    "src/__test__/index.spec.ts",
    "src/index.ts",
    "src/tsconfig.dev.json",
    "jest.config.js",
    "tsconfig.json",
    "tslint.json",
    "package.json"
  ];

  it("basic test", () => {
    const appName = 'basicTest';
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ appName })
      .then(() => {
        const assertFiles = allFile.map(file => {
          return appName + "/" + file;
        });

        assert.file(assertFiles);
        assert.fileContent(`${appName}/package.json`, `"name": "${appName}"`);
      });
  });

  it("name test", () => {
    const appName = 'nameTest';
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ appName })
      .then(() => {
        assert.fileContent(`${appName}/package.json`, `"name": "${appName}"`);
      });
  });

  it("no use jest", () => {
    const appName = 'jestTest';
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ appName, useJest: false })
      .then(() => {
        assert.noFile(["jest.config.js"]);
      });
  });

  it("no use tslint", () => {
    const appName = 'tslintTest';
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ appName, useTslint: false })
      .then(() => {
        assert.noFile(["tslint.json"]);
      });
  });
});
