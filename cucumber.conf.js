const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const config = {
  framework: 'jasmine',
//   frameworkPath: require.resolve('protractor-cucumber-framework'),

  baseUrl: 'https://google.com/',
  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['features/*.feature'],

  capabilities: {
    browserName: 'chrome',
    count: 1,
    chromeOptions: {
      args: ['--kiosk'],
    },
  },

  onPrepare() {
    browser.waitForAngularEnabled(false);
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
  },

  cucumberOpts: {
    'no-colors': true,
    defaultTimeoutInterval: 60000,
    strict: true,
    format: [
      'node_modules/cucumber-pretty',
      'json:reports_json/cucumber_results.json',
    ],
    tags: ['@smoke'],
    require: [
      '../../support/*.js',
      '../../features/step_definitions/**/*.steps.js',
    ],
  },

  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: 'frontend test',
        openReportInBrowser: true,
        jsonDir: 'reports/cucumber/functional/',
        reportPath: 'reports/cucumber/functional',
      },
    },
  ],
};

exports.config = config;
