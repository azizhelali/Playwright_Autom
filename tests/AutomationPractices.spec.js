const {test, expect} = require('@playwright/test');


//test.use({ browserName: 'webkit'});
test('Browser Context-Validating Error login', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog',dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textVerif = await framePage.locator('.text h2').textContent();
    console.log(textVerif.split(" ")[1]);
})
test('Take Screenshot Test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
})
test('Visual Testing', async ({page})=>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})