// 'use strict';
// const Cucumber = require('cucumber');
// const { defineSupportCode } = require('cucumber');
// const fs = require('fs');
// const mkdirp = require('mkdirp');
// const conf = require('../config/main.conf').config;
// const reporter = require('cucumber-html-reporter');
// const report = require('cucumber-html-report');

// const jsonReports = `${process.cwd()}/reports/json`;
// const htmlReports = `${process.cwd()}/reports/html`;
// // var xmlReports = process.cwd() + "/reports/xml";
// const targetJson = `${jsonReports}/cucumber_report.json`;
// // var targetXML = xmlReports + "/cucumber_report.xml";
// const { Given, When, Then } = require('cucumber');

// defineSupportCode(({ After }) => {
//   After(async function(scenario, done) {
//     const world = this;
//     if (await scenario.result.status === Status.FAILED) {
//       console.log("The test has failed.");
//       await browser
//         .takeScreenshot()
//         .then(stream => {
//           const decodedImage = new Buffer(
//             stream.replace(/^data:image\/(png|gif|jpeg);base64,/, ''),
//             'base64'
//           );
//           world.attach(decodedImage, 'image/png');
//         })
//         .then(() => {

//           done();
//         });
//     }else if(await scenario.result.status === Status.PASSED) {
//       // screenShot is a base-64 encoded PNG
//       const screenShot = await browser.takeScreenshot();
//       this.attach(screenShot, "image/png");
//     }
//     await browser.manage().deleteAllCookies();
//     await browser.executeScript('window.sessionStorage.clear();');
//     await browser.executeScript('window.localStorage.clear();');
//     await browser.sleep(5000);

//     console.log("-----------------------------------------------------------------------");

//   });
// });
