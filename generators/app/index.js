"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const beautify = require("gulp-beautify");
const merge = require("lodash.merge");

let baseConfig = require("./baseConfig");

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    // eslint-disable-next-line
    this.registerTransformStream(beautify({ indent_size: 4 }));
  }
  
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the doozie ${chalk.red(
          "generator-modern-typescript"
        )} generator!`
      )
    );
    
    const prompts = [
      {
        type: "input",
        name: "appName",
        message: "What's your app name?"
      },
      {
        type: "confirm",
        name: "useTslint",
        message: "Use tslint?",
        default: true
      },
      {
        type: "confirm",
        name: "useJest",
        message: "Use jest?",
        default: true
      }
    ];
    
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }
  
  writing () {
    const { appName, useJest, useTslint } = this.props;
    const resolvePath = target => {
      return path.join(appName, target);
    };
    
    this.fs.copy(this.templatePath("configs"), resolvePath("configs"));
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      resolvePath("tsconfig.json")
    );
    
    if (useJest) {
      this.fs.copy(this.templatePath("src"), resolvePath("src"));
      this.fs.copy(
        this.templatePath("jest.config.js"),
        resolvePath("jest.config.js")
      );
    } else {
      this.fs.copy(
        this.templatePath("src/index.ts"),
        resolvePath("src/index.ts")
      );
      this.fs.copy(
        this.templatePath("src/tsconfig.dev.json"),
        resolvePath("src/tsconfig.dev.json")
      );
    }
    
    baseConfig.name = appName;
    if (useTslint) {
      this.fs.copy(
        this.templatePath("tslint.json"),
        resolvePath("tslint.json")
      );
    }
    
    if (useJest) {
      baseConfig = merge({}, baseConfig, {
        scripts: {
          test: "jest"
        },
        devDependencies: {
          "@types/jest": "^22.2.3",
          jest: "^22.4.3",
          "ts-jest": "^22.4.6"
        }
      });
    }
    
    if (useTslint) {
      baseConfig = merge({}, baseConfig, {
        scripts: {
          lint: "tslint --project ./src/tsconfig.dev.json --fix"
        },
        devDependencies: {
          tslint: "^5.10.0",
          "tslint-plugin-prettier": "^1.3.0",
          prettier: "^1.12.1"
        }
      });
    }
    
    this.fs.write(resolvePath("package.json"), JSON.stringify(baseConfig));
  }
};
