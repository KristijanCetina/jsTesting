import { expect, Locator, Page } from '@playwright/test';
import { BaseMainOptions } from './BaseMain';

export class FeedbackPage {
	readonly page: Page;
	readonly buttonFeedbackPanelTrigger: Locator;
	readonly inputTitle: Locator;
	readonly selectType: Locator;
	readonly textareaDescription: Locator;
	readonly selectPriority: Locator;
	readonly checkboxEmergency: Locator;
	readonly uploadAttachments: Locator;
	readonly buttonSend: Locator;
	readonly linkIMSHandbook: Locator;
	readonly buttonViewAllIssues: Locator;

	readonly issuesDlg: {
		inputSearchIssues: Locator;
		gridSearchResult: Locator;
		buttonClose: Locator;
	};

	readonly notificationSuccess: Locator;
	readonly selectModule: Locator;
	readonly timestamp: String;

	constructor(page: Page) {
		this.page = page;
		// This is used to have uniqness where it's needed by adding timesamp
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
		this.timestamp = new Date().toLocaleString();
		this.buttonFeedbackPanelTrigger = page.locator(
			'//div[@class="feedbackPanelTrigger"]'
		);
		this.inputTitle = page.locator('//input[@name="Title"]');
		this.selectType = page.locator('//select[@name="Type"]');
		this.textareaDescription = page.locator('//textarea[@name="Description"]');
		this.selectPriority = page.locator('//select[@name="Priority"]');
		this.checkboxEmergency = page.locator('//input[@name="Emergency"]');
		this.uploadAttachments = page.locator('//div[@data-centest="Upload"]');
		this.buttonSend = page.locator('//button[.="Send"]');
		this.linkIMSHandbook = page.locator(
			'(//a[@href="https://ims-handbook.cenosco.com/"])[1]'
		);
		this.buttonViewAllIssues = page.locator('//button[.="View all Issues"]');
		this.notificationSuccess = page.locator(
			"//p[contains(@class, 'CenNotificationText') and contains(text(), 'Thank you for your submission.')]"
		);
		this.selectModule = page.locator("//select[@name='Module']");

		this.issuesDlg = {
			inputSearchIssues: page.locator('//cen-search-toolbar//input'),
			gridSearchResult: page.locator(
				'//div[@role="dialog"]//*[@data-centest="cengrid"]//td[2]'
			),
			buttonClose: page.locator(
				'//div[@role="dialog"]//button[@class="ui-dialog-titlebar-close"]'
			),
		};
	}

	async sendFeedback() {
		const fbTitle = process.env.FEEDBACK_TITLE! + ' ' + this.timestamp;
		const fbDescription =
			process.env.FEEDBACK_DESCRIPTION! + ' ' + this.timestamp;

		await this.buttonFeedbackPanelTrigger.click();
		await this.inputTitle.fill(fbTitle);
		await this.selectType.selectOption({ label: 'Support' });
		await this.textareaDescription.fill(fbDescription);
		await this.selectPriority.selectOption({ label: 'Normal' });
		await this.page
			.locator("//div[@data-centest='Module']//span[text()='-']")
			.click();
		await this.page
			.locator("//div[@class='chosen-search']//input[1]")
			.fill('FLOC');
		await this.page.keyboard.press('ArrowDown');
		await this.page.keyboard.press('Enter');
		//await this.selectModule.click()
		//await this.selectModule.selectOption({label:'FLOC'})
		await this.buttonSend.click();
		const baseMain = new BaseMainOptions(this.page);
		await baseMain.checkNotificationContains('Thank you for your submission.');
		await baseMain.closeNotification();

		await this.buttonViewAllIssues.click();
		await this.issuesDlg.inputSearchIssues.fill(fbTitle);
		await this.page.keyboard.press('Enter');
		await this.page.waitForTimeout(3000);
		await expect
			.soft(this.issuesDlg.gridSearchResult.first())
			.toHaveText(fbTitle);
		await this.issuesDlg.buttonClose.click();
		await this.buttonFeedbackPanelTrigger.click();
		console.log('Feedback Check Successful');
	}
}
