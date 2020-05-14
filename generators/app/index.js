'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const beautify = require('gulp-beautify');
const merge = require('lodash.merge');

let baseConfig = require('./baseConfig');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // eslint-disable-next-line
    this.registerTransformStream(beautify({ indent_size: 4 }));
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the doozie ${chalk.red('generator-modern-typescript')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: "What's your package name?",
      },
      {
        type: 'confirm',
        name: 'useEslint',
        message: 'Use eslint and prettier?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'useJest',
        message: 'Use jest?',
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { packageName, useJest, useEslint } = this.props;

    const resolvePath = (target) => {
      return path.join(packageName, target);
    };

    baseConfig.name = packageName;

    this.copyTemplate(this.templatePath('gitignore-template'), resolvePath('.gitignore'));
    this.copyTemplate(this.templatePath('tsconfig.json'), resolvePath('tsconfig.json'));
    this.copyTemplate(this.templatePath('tsconfig.build.json'), resolvePath('tsconfig.build.json'));

    this.copyTemplate(this.templatePath('src/index.ts'), resolvePath('src/index.ts'));

    if (useJest) {
      this.copyTemplate(this.templatePath('src/__test__'), resolvePath('src/__test__'));
      this.copyTemplate(this.templatePath('jest.config.js'), resolvePath('jest.config.js'));

      baseConfig = merge({}, baseConfig, {
        scripts: {
          test: 'jest',
        },
        devDependencies: {
          '@types/jest': '^25.2.1',
          jest: '^26.0.1',
          'ts-jest': '^25.5.1',
        },
      });
    }

    if (useEslint) {
      this.copyTemplate(this.templatePath('.eslintignore'), resolvePath('.eslintignore'));
      this.copyTemplate(this.templatePath('.eslintrc.js'), resolvePath('.eslintrc.js'));
      this.copyTemplate(this.templatePath('.prettierrc.js'), resolvePath('.prettierrc.js'));

      baseConfig = merge({}, baseConfig, {
        scripts: {
          lint: 'eslint . --ext .js,.jsx,.ts,.tsx',
        },
        devDependencies: {
          '@typescript-eslint/eslint-plugin': '^2.32.0',
          '@typescript-eslint/parser': '^2.32.0',
          eslint: '^7.0.0',
          'eslint-config-airbnb-typescript': '^7.2.1',
          'eslint-plugin-import': '^2.20.2',
          'eslint-config-prettier': '^6.11.0',
        },
      });
    }

    this.fs.write(resolvePath('package.json'), JSON.stringify(baseConfig));
  }
};
