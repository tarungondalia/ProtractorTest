'use strict';
const {
  TIMEOUT
} = require('./support/constants');
const excelToJson = require('convert-excel-to-json')
// spec.js

const xl = require('./XLReader.js');
const fs = require('fs-extra');
const path = require('path');

const EC = protractor.ExpectedConditions;

describe('Protractor Demo App', function () {
  var alphabetsList = element.all(by.css('div.container.content.ie-top > div:nth-child(1) > div > ul > li a'));
  var firstCompanyList = element(by.css('div.col-md-6.ingredients.ieleft ul'))
  var firstCompanyName = element(by.css('div.col-md-6.ingredients.ieleft li:nth-child(1) a'));
  var companyTitle = element(by.css('.title'));
  var companyDetail = element(by.css('.company-details'));
  var thirdCompanyName = element(by.css('div.col-md-6.ingredients.ieleft li:nth-child(3) a'));
  var secondCompanyList = element(by.css('div.col-md-6.ingredients.ieright ul'))
  var lastCompanyName = element.all(by.css('div.col-md-6.ingredients.ieright li'));

  beforeEach(async function () {
    await browser.get('https://www.medicines.org.uk/emc/browse-companies');
    await browser.waitForAngularEnabled(false);
  });

  it('Get total list of companies', async function () {
    let companyNames = [], companyDetails = [], fullDetails = [];
    await alphabetsList.then(async (totalCompaniesList) => {
      console.log('totalCompaniesList: ' + totalCompaniesList.length);
      for (let i = 2; i <= 27; i++) {
        if (i != 25 && i != 26) {
          let ele = element(by.css('.browse-head ul li:nth-child(' + i + ') a'));
          await ele.click();
          await browser.sleep(2000);
          await firstCompanyName.click();
          await companyTitle.getText().then(async (name) => {
            await companyNames.push(name);
          });
          await companyDetail.getText().then(async (detail) => {
            companyDetails.push(detail);
          });
          await browser.navigate().back();
          await browser.sleep(1000);
        }
        fullDetails = companyNames.concat(companyDetails);
      }
      fullDetails = fullDetails.toString();
      console.log('Here is full company details:' + fullDetails);

      var outputFilename = 'companyDetails.xlsx';
      fs.writeFile(outputFilename, fullDetails, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
      })
    })
  });

  afterEach(async function () {
    var result = await excelToJson({
      source: fs.readFileSync('companyDetails.xlsx')
    });
    await console.log('Excel Output : ' + result);
  })
});