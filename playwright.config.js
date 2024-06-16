// @ts-check

const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 2,
  timeout: 30000,
  workers: 5,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: 'allure-playwright',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    ignoreHTTPSErrors: true,
  },
};

module.exports = config;
