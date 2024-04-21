import { PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';
import {EnvironmentConfig, environment} from './config/envs'
import * as dotenv from 'dotenv'
import { trace } from 'console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const defaultConfig:PlaywrightTestConfig = {
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 3,  //retry twice on CI and 3 times otherwise.
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'global setup',
      testMatch: "global.setup.ts"
    },
    {
      name: 'global teardown',
      testMatch: "global.setup.ts"
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      dependencies: ['global setup'],
      testMatch: "*.spec.ts",
      teardown: 'global teardown',
    },    
    {
       name: 'firefox',
       use: { ...devices['Desktop Firefox'] },
       dependencies: ['global setup'],
       testMatch: "*.spec.ts",
       teardown: 'global teardown',
    },
    {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 13'] },
       dependencies: ['global setup'],
       testMatch: "*.spec.ts",
       teardown: 'global teardown',
     },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

const environmentName = process.env.TEST_ENV || 'dev';

const config: EnvironmentConfig = {
  ...defaultConfig,
  ...(environment[environmentName])
};

export default config;