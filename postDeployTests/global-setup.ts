// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './pom/Login';
import { MainGridToolbarPage } from './pom/MainGridToolbar';

async function globalSetup(config: FullConfig) {
	const { baseURL, storageState } = config.projects[0].use;
	const browser = await chromium.launch();
	const page = await browser.newPage();

	const loginPage = new LoginPage(page);
	const mainGridToolbarPage = new MainGridToolbarPage(page);
	await browser.newContext({ storageState });
	await page.goto(baseURL!);
	await loginPage.loginCorpAdm();
	await page.context().storageState({ path: storageState as string });
	await mainGridToolbarPage.clearAllFilters();
	await browser.close();
}

export default globalSetup;
