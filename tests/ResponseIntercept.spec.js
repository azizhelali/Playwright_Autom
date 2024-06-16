const {test, expect,request} = require('@playwright/test');
const {APiUtils}=require('../Utils/APIUtils');
const loginPayLoad ={userEmail: "med.aziz.helali1992@gmail.com", userPassword: "MarouZizou82"};
const OrderPayLoad={orders:[{country: "France", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let response;
const FakePayloadOrders={ data: [], message: "No Orders" };
test.beforeAll(async()=>{
const apiContext= await request.newContext();
const apiUtils=new APiUtils(apiContext,loginPayLoad);
response = await apiUtils.createOrder(OrderPayLoad);
})

// test.use({ browserName: 'webkit'});
test('@API Place Order', async ({ page }) => {
    page.addInitScript(value => {
      window.localStorage.setItem("token", value);
    }, response.token);
  
    await page.goto("https://rahulshettyacademy.com/client");
    page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route=>
    {
      const response = await page.request.fetch(route.request());
      let body=JSON.stringify(FakePayloadOrders);
      route.fulfill(
        {
          response,
          body,

        });
    }
    )
    await page.locator("button[routerlink*='orders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    
    
    
    
  });