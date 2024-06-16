const { test, expect } = require('@playwright/test');
const { customtest } = require('../Utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../Utils/ClientAppPO_testData.json')));
//test.use({ browserName: 'webkit'});
for (const data of dataSet){
test(`Client app login for ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goUrl();
  await loginPage.validLogin(data.username, data.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})
}
customtest('Client app login', async ({ page,testDataForOrder }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goUrl();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAndAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})