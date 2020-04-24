'use strict';
const EC = protractor.ExpectedConditions;

function companyListPage() {
    var alphabetsList = element.all(by.css('div.container.content.ie-top > div:nth-child(1) > div > ul > li a'));
    var firstCompanyList = element(by.css('div.col-md-6.ingredients.ieleft ul'))
    var firstCompanyName = element(by.css('div.col-md-6.ingredients.ieleft li:nth-child(1) a'));
    var companyTitle = element(by.css('.title'));
    var companyDetail = element(by.css('.company-details'));
    var companyLogo = element(by.css('.companyLogoWrapper img'));
    var thirdCompanyName = element(by.css('div.col-md-6.ingredients.ieleft li:nth-child(3) a'));
    var secondCompanyList = element(by.css('div.col-md-6.ingredients.ieright ul'))
    var lastCompanyName = element.all(by.css('div.col-md-6.ingredients.ieright li'));

    this.allCompanyName = async function () {
        let companyNames = [];
        await alphabetsList.then(async (totalCompaniesList) => {
            console.log('totalCompaniesList: ' + totalCompaniesList.length);
            for (let i = 2; i <= 4; i++) {
                if (i != 25 && i != 26) {
                    let ele = element(by.css('.browse-head ul li:nth-child(' + i + ') a'));
                    await ele.click();
                    await browser.sleep(2000);
                    await firstCompanyName.click();
                    await companyTitle.getText().then(async (name) => {
                        await companyNames.push(name);
                        console.log('companyNames' + companyNames);
                        return companyNames;
                        await browser.navigate().back();
                        await browser.sleep(1000);
                    });
                }
            }
        })
    }

}
module.exports = new companyListPage ();
