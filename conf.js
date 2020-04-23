// conf.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    defaultTimeoutInterval: 2500000,
    multiCapabilities: [{
      browserName: 'firefox'
    }, {
      browserName: 'chrome'
    }],


  onPrepare() {
    browser.waitForAngularEnabled(false);
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should;
    var originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2500000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  },
  cucumberOpts: {
    'no-colors': true,
    defaultTimeoutInterval: 2500000,
    strict: true,
    format: [
      'node_modules/cucumber-pretty',
      'json:reports/cucumber_results.json',
    ],
    tags: ['@smoke'],
    // require: [
    //   '../../support/*.js',
    //   '../../features/step_definitions/**/*.steps.js',
    // ],
  },

  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        reportName: 'frontend test',
        // openReportInBrowser: true,
        jsonDir: 'reports/cucumber/functional/',
        reportPath: 'reports/cucumber/functional',
      },
    },
  ],

  }
