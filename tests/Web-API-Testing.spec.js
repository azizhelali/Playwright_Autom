const {test, expect,request} = require('@playwright/test');
const {APiUtils}=require('../Utils/APIUtils');
const loginPayLoad ={userEmail: "med.aziz.helali1992@gmail.com", userPassword: "MarouZizou82"};
const OrderPayLoad={orders:[{country: "France", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let response;

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
    await page.locator("button[routerlink*='orders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    
    
    for(let i =0; i<await rows.count(); ++i)
    {
       const rowOrderId =await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId))
       {
           await rows.nth(i).locator("td button").first().click();
           break;
       }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  });