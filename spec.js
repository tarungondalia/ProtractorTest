'use strict';
const {
  TIMEOUT
} = require('./support/constants');
const excelToJson = require('convert-excel-to-json')
const companyListPage = require('./pages/companyListPage');
// spec.js

const xl = require('./XLReader.js');
const fs = require('fs');
const path = require('path');
const writeJsonFile = require('write-json-file');

const EC = protractor.ExpectedConditions;
const baseUrl = 'https://www.medicines.org.uk';

describe('Protractor Demo App', function () {
  var alphabetsList = element.all(by.xpath("//*[@class = 'browse' ]//a"));
  var firstCompanyList = element(by.css('div.col-md-6.ingredients.ieleft ul'))
  var firstCompanyName = element(by.css('div.col-md-6.ingredients.ieleft li:nth-child(1) a'));
  var companyTitle = element(by.css('.title'));
  var companyDetail = element(by.css('.company-details'));
  var companyLogo = element(by.css('.companyLogoWrapper img'));
  var thirdCompanyName = element(by.css('div.col-md-6.ingredients.ieleft li:nth-child(3) a'));
  var secondCompanyList = element(by.css('div.col-md-6.ingredients.ieright ul'))
  var lastCompanyName = element.all(by.css('div.col-md-6.ingredients.ieright li'));

  beforeEach(async function () {
    await browser.get('https://www.medicines.org.uk/emc/browse-companies');
    await browser.waitForAngularEnabled(false);
  });

  it('Get total list of companies', async function () {
    let companyNames = [], companyDetails = [], fullDetails = [], images = [];
    let dummyjson = {}
    await alphabetsList.then(async (totalCompaniesList) => {
      console.log('totalCompaniesList: ' + totalCompaniesList.length);
      totalCompaniesList.forEach(async(ele)=>{
        await ele.click();
        await browser.sleep(2000);
      });
      for (let i = 2; i <= 3; i++) {
        if (i != 25 && i != 26) {
          let ele = element(by.css('.browse-head ul li:nth-child(' + i + ') a'));
          await ele.click();
          await browser.sleep(2000);
          await firstCompanyName.click();
          await companyTitle.getText().then(async (name) => {
            await dummyjson.companyname  == name ;
            await companyNames.push(name);
          });
          await companyDetail.getText().then(async (detail) => {
            companyDetails.push(detail);
          });
          await companyLogo.getAttribute('src').then(async (imageSrc) => {
            await images.push(imageSrc);
            console.log("images:" + images);
            await browser.navigate().back();
            await browser.sleep(2000);
          });
            if((await thirdCompanyName.isPresent()) == true){
              await thirdCompanyName.click();
              await companyTitle.getText().then(async (thirdName) => {
                await companyNames.push(thirdName);
                await companyDetail.getText().then(async (thirdDetail) => {
                  companyDetails.push(thirdDetail);
                  await companyLogo.getAttribute('src').then(async (thirdImageSrc) => {
                    await images.push(thirdImageSrc);
                    console.log("images:" + images);
                    await browser.navigate().back();
                    await browser.sleep(1000);
                  });
                });
              });
            } else {
              console.log("There is no third company present.");
            }
      
        }
        fullDetails = companyNames.concat(companyDetails);
        fullDetails = fullDetails.concat(images);
      }
      fullDetails = fullDetails.toString();

      console.log('Here is full company details:' + fullDetails);

      var outputFilename = 'companyDetails.json';
      fs.writeFileSync(outputFilename, JSON.stringify(fullDetails), function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);

          writeJsonFile('detail.json', fullDetails, { fullDetails: true });

        }
      })
    })
  });

  afterEach(async function () {
    var result = await excelToJson({
      sourceFile: ('companyDetails.xlsx')
    });
    await console.log('Excel Output : ' + result);
  })
});