import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import 'dotenv/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const testRailOptions = {
	// Whether to add <properties> with all annotations; default is false
	embedAnnotationsAsProperties: true,
	// Where to put the report.
	outputFile: './test-results/junit-report.xml',
};

dotenv.config();
require('dotenv').config();
// This is failing
//dotenv.config({ path: path.resolve(__dirname, '..', '.env.dev') });

// This is working
dotenv.config({ path: path.resolve(__dirname, '/.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
	testDir: './tests',
	//globalSetup: require.resolve('./global-setup'),
	//globalSetup: './global-setup',
	/* Maximum time one test can run for. */
	timeout: 300 * 5000,

	// Select report type by commenting one of the two option. Comment out or line #33 or lines form #35 to #55
	//reporter: [['html', { open: 'never' }]],

	reporter: [['html', { open: 'on-failure' }]],

	expect: {
		timeout: 30000,
	},

	/* Fail the build on CI if you accidentally left test.only in the source code. */
	reportSlowTests: {
		max: 5,
		threshold: 200000,
	},

	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	//retries: 3,
	//retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 6 : 4,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */

		actionTimeout: 0,
		//storageState: 'auth.json',
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'https://ims-latest.apps.cenosco.local/',
		headless: false,

		//viewport: { width: 1920, height: 1080 },
		viewport: { width: 1920, height: 1080 },
		ignoreHTTPSErrors: true,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on',
		video: 'off',

		screenshot: 'only-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		// {
		// 	name: 'chromium',
		// 	use: {
		// 		...devices['Desktop Chrome'],
		// 		locale: 'en-GB',
		// 		viewport: { width: 1920, height: 1080 },
		// 		launchOptions: { slowMo: 500, channel: 'chrome' },
		// 	},
		// },
		// {
		// 	name: 'firefox',
		// 	use: {
		// 		...devices['Desktop Firefox'],
		// 	},
		// },
		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
				locale: 'en-GB',
				viewport: { width: 1920, height: 1080 },
			},
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: {
		//     ...devices['Pixel 5'],
		//   },
		// },
		// {
		// 	name: 'Mobile Safari',
		// 	use: {
		// 		...devices['iPhone 12'],
		// 	},
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: {
		//     channel: 'msedge',
		//   },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: {
		//     channel: 'chrome',
		//   },
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   port: 3000,
	// },
};

export default config;
