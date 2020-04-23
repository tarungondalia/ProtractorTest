'use strict';
const EC = protractor.ExpectedConditions;

function commonPage() {
    this.pageHeader = element(by.css("cx-page-layout[section='header']"));
    this.pageTemplate = element(by.css('app-root cx-page-layout.ProductDetailsPageTemplate'));
    this.pageTitle = `cx-page-layout`;
    this.Footer = element(by.css('footer cx-footer-navigation'));
    this.outOfStocks = element.all(by.css('.cx-product-basket > cx-add-to-cart > button[disabled]'));


}
module.exports = new commonPage();
