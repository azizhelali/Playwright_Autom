const {test, expect} = require('@playwright/test');

let WebContext;
const email ="med.aziz.helali1992@gmail.com";
test.beforeAll(async({browser})=>{
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();    
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("MarouZizou82");
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');
await context.storageState({path:'state.json'});
WebContext = await browser.newContext({storageState:'state.json'});
})

//test.use({ browserName: 'webkit'});
test('@API Browser Context-Validating login', async ()=>
{
const productName = "zara coat 3";
const page = await WebContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");
const products = page.locator(".card-body");
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);

const count = await products.count();
for(let i=0;i<count;i++){
    if(await products.nth(i).locator("b").textContent() === productName){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    };
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=await page.locator("h3:has-text('zara coat 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder='Select Country']").type("Ind",{delay:100});
await page.locator(".ta-results").waitFor();
const dropDownList = page.locator(".ta-results button");
const optionsNumber = await dropDownList.count();

for (let i=0;i<optionsNumber;++i){
let text = await dropDownList.nth(i).textContent();
if(text.trim()==="India"){
    await dropDownList.nth(i).click();
    break;
}
}
await page.waitForTimeout(2000);
await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId=await page.locator("label.ng-star-inserted").textContent();
console.log(orderId);

await page.locator("button[routerlink*='orders']").click();
await page.locator(".ng-star-inserted h1").waitFor();

const listeOrderIds = await page.locator("tr th[scope='row']").all();
for (let i = 0; i < listeOrderIds.length; i++) {
  const orderIdText = await listeOrderIds[i].innerText();
  console.log(orderIdText);
  if(orderId.includes(orderIdText)){
    const viewButton = page.locator("tr td button.btn-primary").nth(i);
    await viewButton.click();
    break;
  }
}
const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();

})
test('Test Case 2',async()=>{
const productName = "zara coat 3";
const page = await WebContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");
const products = page.locator(".card-body");
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
})