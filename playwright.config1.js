// @ts-check

const { defineConfig, devices, chromium } = require('@playwright/test');

 

module.exports = defineConfig({

  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,
  retries:1,
  workers :3,
  expect: {

    timeout: 5000,

    },

  /* Run tests in files in parallel */

  reporter: 'allure-playwright',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects:[
    {
      name:'chrome',
      use: {

        browserName : 'chromium',
    
        headless:false,
    
        screenshot : 'on',
        ignoreHTTPSErrors: true,
        trace : 'on',
        video:'retain-on-failure',
        viewport: { width: 720, height: 720 },
    
      },
    },
    {
      name:'safari',
      use: {

        browserName : 'webkit',
    
        headless:false,
    
        screenshot : 'only-on-failure',
    
        trace : 'on',
        ignoreHTTPSErrors:true,
        ... devices['iphone 11']
    
      },
    }
  ]

});