const {test, expect} = require('@playwright/test');


//test.use({ browserName: 'webkit'});
test('Browser Context-Validating Error login', async ({browser})=>
{
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();
page.route('**//*.{jpg,png,jpeg}',route=>route.abort);
const userName = page.locator('#username');
const signIn = page.locator('#signInBtn')
const cardTitles = page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop");
// console.log(await cardTitles.first().textContent());
// console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
})

test('UI Control Playwright test',async ({page})=> {
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const docLink = page.locator('a[href*="documents"]');
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  //css 
await page.locator('#username').fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
const dropdown = page.locator("select.form-control");
await dropdown.selectOption("consult");
await page.locator('label.customradio input[type="radio"][value="user"]').click();
await expect(page.locator('label.customradio input[type="radio"][value="user"]')).toBeChecked();
console.log(await page.locator('label.customradio input[type="radio"][value="user"]').isChecked());
await page.locator("#okayBtn").click();
await page.locator("#terms").click();
await page.locator("#terms").isChecked();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(page.locator("#terms")).not.toBeChecked();
await expect(docLink).toHaveAttribute("class","blinkingText");

await page.locator('#signInBtn').click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
})

test('Child Window Handle',async ({browser})=> {
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
const docLink = page.locator('a[href*="documents"]');

const [newPage] = await Promise.all([
context.waitForEvent('page'),
docLink.click()
 ])
const text =await newPage.locator(".im-para.red").textContent();
console.log(text);
const arrayText =text.split("@");
const domain=arrayText[1].split(" ")[0];
await page.locator('#username').fill(domain);
})