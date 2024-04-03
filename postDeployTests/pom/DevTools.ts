import { expect, Locator, Page, Download, Response } from '@playwright/test';
import { BaseMainOptions } from './BaseMain';

export class DevToolsPage {
	readonly page: Page;
	readonly tab1Logging: Locator;
	readonly tab1Config: Locator;
	readonly tab2HDTool: Locator;
	readonly tab2Survey: Locator;
	readonly selectDataServiceLogs: Locator;
	readonly selectClientLogs: Locator;
	readonly buttonReadLogDirectory: Locator;
	readonly buttonDownloadFirstTrace: Locator;
	readonly buttonResetSurveyProvider: Locator;

	constructor(page: Page) {
		this.page = page;
		this.tab1Logging = page.locator(
			'//div[@class="cen-devtools-tabs"]//span[.="Logging"]'
		);
		this.tab1Config = page.locator(
			'//div[@class="cen-devtools-tabs"]//span[.="Config"]'
		);
		this.tab2HDTool = page.locator(
			'//div[@class="cen-devtools-tabs"]//span[.="HD Tool"]'
		);
		this.tab2Survey = page.locator(
			'//div[@class="cen-devtools-tabs"]//span[.="Survey"]'
		);
		this.selectDataServiceLogs = page.locator('//select[@id="logSel"]');
		this.selectClientLogs = page.locator(
			'//select[@id="logSel"]/option[.="ClientLogs"]'
		);
		this.buttonReadLogDirectory = page.locator(
			'//div[@class="WrapBlock SearchContainerWrapBlock devtools-HDtool"]//button[@title="Contents"]'
		);
		this.buttonDownloadFirstTrace = page.locator(
			'(//button[contains(.,"race")])[1]'
		);
		this.buttonResetSurveyProvider = page.locator(
			'//input[@value="Reset Survey Provider"]'
		);
	}

	async checkHDTool(url: string) {
		await this.page.goto(url + '#devtools');
		await this.tab1Logging.click();
		await this.tab2HDTool.click();
		await this.selectDataServiceLogs.selectOption({ label: 'DataServiceLogs' });
		await this.buttonReadLogDirectory.click();
		const [download] = await Promise.all([
			this.page.waitForEvent('download'),
			await this.buttonDownloadFirstTrace.click(),
		]);
		const path = download.suggestedFilename();
		await download.failure();
		await download.delete();
		console.log('HD Tool Check Successful');
	}

	async resetSurveyProvider() {
		await this.tab1Config.click();
		await this.tab2Survey.click();
		await this.buttonResetSurveyProvider.click();
		const baseMain = new BaseMainOptions(this.page);
		await baseMain.checkNotification(
			'ResetSurveyProvider reset has been triggered.'
		);
		await baseMain.closeNotification();
		console.log('Survey provider successfully reset');
	}

	// async resetWorkflow() {
	//     await this.page.locator("//span[.='Service']").click()
	//     await this.page.locator("//a[.='Workflow']").click()
	//     await expect(this.page.locator("//div[@class='CenNotification CenNotificationVisible CenNotifySuccess']")).toHaveText("workflow reset has been triggered.")
	// }
}
