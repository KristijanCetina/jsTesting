import { test, expect, Page } from '@playwright/test';
import { MainGridToolbarPage } from '../pom/MainGridToolbar';
import { MainNavTabsPage } from '../pom/MainNavTabs';
import { FLOCForm } from '../pom/FLOCForm';
import { LoginPage } from '../pom/Login';
import { DevToolsPage } from '../pom/DevTools';
import { DashboardPage } from '../pom/Dashboard';
import { MainGridPage } from '../pom/MainGrid';
import { ReportsLightboxPage } from '../pom/ReportsLightbox';
import { FeedbackPage } from '../pom/Feedback';
import { CorrosionLoopPage } from '../pom/CorrosionLoop';
import { ModulePickerPage } from '../pom/ModulePicker';
import { BaseMainOptions } from '../pom/BaseMain';
import { MyAccount } from '../pom/MyAccount';
import { MainGridFiltersPage } from '../pom/MainGridFilters';
import sites from '../data/ListOfSites.json';
import { format } from 'date-fns/format';
import { enGB } from 'date-fns/locale';

let loginPage: LoginPage;
let modulePickerPage: ModulePickerPage;
let mainGridPage: MainGridPage;
let mainGridToolbarPage: MainGridToolbarPage;
let baseMain: BaseMainOptions;
let mainNavTabsPage: MainNavTabsPage;
let devTools: DevToolsPage;
let reportsLightboxPage: ReportsLightboxPage;
let myAccount: MyAccount;

test.describe.configure({ mode: 'parallel' });

// Repeat all the tests for each site in ./Data/ListOfSites.json file
for (const site in sites) {
	const currentDate = format(new Date(), 'd MMM yyyy, HH:mm:ss', {
		locale: enGB,
	});
	const siteObj = sites[site];

	test(site, async ({ page }) => {
		const url: string = siteObj.url;
		loginPage = new LoginPage(page);
		modulePickerPage = new ModulePickerPage(page);
		mainGridPage = new MainGridPage(page);
		mainGridToolbarPage = new MainGridToolbarPage(page);
		baseMain = new BaseMainOptions(page);
		mainNavTabsPage = new MainNavTabsPage(page);
		devTools = new DevToolsPage(page);
		reportsLightboxPage = new ReportsLightboxPage(page);
		myAccount = new MyAccount(page);

		await test.step('Login Check', async () => {
			await checkConsoleLog(page, site);
			await page.goto(url + '#fcmfloc');
			await login(page);
			await mainGridToolbarPage.clearAllFilters();
			await mainGridToolbarPage.clearScoping();
		});

		// await test.step('Feedback Check', async () => {
		// 	const feedbackPage = new FeedbackPage(page);
		// 	await feedbackPage.sendFeedback();
		// });

		// await test.step('HD Tool Check', async () => {
		// 	await devTools.checkHDTool(url);
		// });

		// await test.step('Reset Survey Provider', async () => {
		// 	// Must be called immediately after HD Tool Check,
		// 	// until the page refresh is fixed.
		// 	await devTools.resetSurveyProvider();
		// });

		// if (siteObj.PEI == true) {
		// 	await test.step('Go To PEI', async () => {
		// 		await modulePickerPage.goToPEI(url);
		// 	});

		// 	await test.step('PEI Main Grids Check', async () => {
		// 		await baseMain.goToMyAccount();
		// 		await myAccount.checkPEIMainGrids();
		// 	});

		// 	await test.step('Checklist Findings Check', async () => {
		// 		if (siteObj.CIVIL == true) {
		// 			await modulePickerPage.selectCivil();
		// 		}
		// 		await checkChecklistFindings(page);
		// 	});

		// 	await test.step('PI Service Check', async () => {
		// 		if (siteObj.PIService == true) {
		// 			await checkPIService(page);
		// 		}
		// 	});

		// 	await test.step('Dynamic Forms Check', async () => {
		// 		await checkDynamicForms(page);
		// 	});

		// 	// await test.step('Shared Repository Check', async () => {
		// 	// 	switch (site) {
		// 	// 		case 'NLNG':
		// 	// 		case 'BLNG':
		// 	// 		case 'SMEP':
		// 	// 		case 'LNG Canada':
		// 	// 		case 'Convent':
		// 	// 		case 'Tunisia':
		// 	// 		case 'SEPCIN':
		// 	// 		case 'CRUX':
		// 	// 		case 'TAO Sandbox':
		// 	// 		case 'taqa':
		// 	// 			console.log(
		// 	// 				site + " doesn't have shared repository for dynamic forms"
		// 	// 			);
		// 	// 			break;
		// 	// 		default:
		// 	// 			await expect(
		// 	// 				page.locator("//input[@id='checkDynamicForms_SharedLibrary1']")
		// 	// 			).toBeVisible({ timeout: 10000 });
		// 	// 			console.log('Shared Repository Check Successful');
		// 	// 	}
		// 	// });

		// 	await test.step('ECH Report 405 Check', async () => {
		// 		switch (site) {
		// 			case 'LNG Canada':
		// 			case 'Projects Game Americas':
		// 			case 'QGC':
		// 			case 'Projects Game EuSA':
		// 			case 'CRUX':
		// 			case 'Trading Supply EA':
		// 				console.log(site + " doesn't have ECHs");
		// 				break;
		// 			default:
		// 				await checkECHReport405(page);
		// 		}
		// 	});

		// 	await test.step('Schedule Report 408 Check', async () => {
		// 		switch (site) {
		// 			case 'Projects Game Americas':
		// 			case 'QGC':
		// 			case 'Projects Game EuSA':
		// 			case 'CRUX':
		// 				console.log(site + " doesn't have Schedules");
		// 				break;
		// 			default:
		// 				await checkScheduleReport408(page);
		// 		}
		// 	});

		// 	// await FlocCheck(page)
		// 	// await MainGridCheckPEI(page)  //NEED TO FINISH ADD VERIFY
		// 	// await CCDReporCheck(page)
		// 	// await verifyGlobalDashboardSectionsCheck(page)
		// }

		// if (siteObj.RCM == true) {
		// 	await test.step('Go To RCM', async () => {
		// 		await modulePickerPage.goToRCM(url);
		// 	});

		// 	await test.step('RCM Main Grids Check', async () => {
		// 		await baseMain.goToMyAccount();
		// 		await myAccount.checkRCMMainGrids();
		// 	});

		// 	await test.step('Global RSL Check', async () => {
		// 		switch (site) {
		// 			case 'Trading and Supply AM':
		// 			case 'TAO Sandbox':
		// 			case 'Hydrogen':
		// 			case 'Trinidad and Tobago':
		// 			case 'CRUX':
		// 				console.log(site + " doesn't have Global RSL");
		// 				break;
		// 			default:
		// 				await verifyGlobalRSL(page, site);
		// 		}
		// 	});

		// 	//await MainGridCheckRCM(page)  //NEED TO FINISH ADD VERIFY
		// }

		// if (siteObj.PLSS == true) {
		// 	await test.step('Go To PLSS', async () => {
		// 		await modulePickerPage.goToPLSS(url);
		// 	});

		// 	await test.step('PLSS Main Grids Check', async () => {
		// 		await baseMain.goToMyAccount();
		// 		await myAccount.checkPLSSMainGrids();
		// 	});

		// 	await test.step('PLSS ECH Report Check', async () => {
		// 		switch (site) {
		// 			case 'SDO':
		// 			case 'CRUX':
		// 				console.log(site + " doesn't have PLSS ECHs");
		// 				break;
		// 			default:
		// 				await checkPLSSECHReport(page);
		// 		}
		// 	});
		// }

		// if (siteObj.SIF == true) {
		// 	await test.step('Go To SIF', async () => {
		// 		await modulePickerPage.goToSIF(url);
		// 	});

		// 	await test.step('SIF Main Grids Check', async () => {
		// 		await baseMain.goToMyAccount();
		// 		await myAccount.checkSIFMainGrids();
		// 	});

		// 	await test.step('SIF Analysis Report Check', async () => {
		// 		await verifySifAnalysisReport(page);
		// 	});
		// }

		if (siteObj.FCM == true) {
			await test.step('Go To FCM', async () => {
				await modulePickerPage.goToFCM(url);
			});

			await test.step('FCM Main Grids Check', async () => {
				await baseMain.goToMyAccount();
				await myAccount.checkFCMMainGrids();
			});
		}

		if (siteObj.MobUrl) {
			await test.step('Mobile Site Check', async () => {
				await page.goto(siteObj.MobUrl + '#peifloc');
				await login(page);
				console.log('Mobile Site Check Successful');
			});
		} else {
			console.log(site + " doesn't have a mobile site url");
		}
	});
}

async function login(page: Page) {
	//await loginPage.verifyLoginValidaton()
	await loginPage.verifyVersion();
	await loginPage.loginCorpAdm();

	// Close New Version pop-up dialog
	const okButton = page.locator("//button[text()='OK']");
	if (await okButton.isVisible()) {
		await okButton.click();
	}

	console.log('Login Check Successful');
}

async function LockedCorpAdmWait(page: Page) {}

async function FlocCheck(page: Page) {
	await mainNavTabsPage.goToFLOC();
	await mainGridToolbarPage.createNewEnityForm();
	const flocForm = new FLOCForm(page);
	await expect(flocForm.placeholderStartupDateDDMMMYYYY).toBeVisible();
	//await page.locator('xpath=//html/body/div[6]/div[1]/button').click()
	await page.locator('//a[contains(text(),"Cancel")]').click();
}

async function CCDReporCheck(page: Page, siteName: string) {
	await mainNavTabsPage.goToECH();
	await mainGridPage.clickRow1Column2();
	await mainGridToolbarPage.buttonReport.click();
	//ALE await reportsLightboxPage.downloadCCDReport()
	await reportsLightboxPage.downloadReport('CCD Report Loop');
	await page.locator('//body/div[6]/div[1]/button[1]').click();
	console.log('CCD Report Successful');
	console.log('--------------------------------------------------------');
}

async function verifyPinOf25ParentCheck(page: Page) {
	const url2 = await page.url();
	let myLink = url2 + '#peifloc';
	await page.goto(myLink);

	await mainNavTabsPage.goToFLOC();

	await mainGridToolbarPage.selectPaging25();
	await mainGridToolbarPage.pin25Entities();

	await mainGridToolbarPage.verifyPiningOf25Entities();
	await mainGridToolbarPage.removePinOf25Entities();

	await mainGridToolbarPage.verifyRemovalOfPinned25Entities();
}

async function verifyGlobalDashboardSectionsCheck(page: Page) {
	const dashboardPage = new DashboardPage(page);
	const url2 = await page.url();
	let myLink = url2 + '#dashboard';
	await page.goto(myLink);
	// await mainNavTabsPage.goToPEIDashboard()
	await dashboardPage.openGlobalDashboard();
	await dashboardPage.verifyGlobalDashboardSections();
	//await page.context().storageState({ path: './PROD_auth.json' })
}

async function checkECHReport405(page: Page) {
	await mainNavTabsPage.goToECH();
	await mainGridPage.clickRow1Column2();
	await mainGridToolbarPage.buttonReport.click();
	await reportsLightboxPage.downloadReport('Condition History SRBI (R405)');
	console.log('ECH Report 405 Check Successful');
}

async function checkScheduleReport408(page: Page) {
	//await mainNavTabsPage.goToPEI()
	await mainNavTabsPage.goToSchedule();
	await mainGridPage.clickRow1Column1();
	await mainGridToolbarPage.buttonReport.click();
	//ALE await reportsLightboxPage.downloadR408Report()
	await reportsLightboxPage.downloadReport('Schedule scope (R407 / R408)');
	console.log('Schedule Report 408 Check Successful');
}

async function MainGridCheckPEI(page: Page) {
	await mainNavTabsPage.goToComponent();
	await mainNavTabsPage.goToFLOC();
	await mainNavTabsPage.goToCorrosionLoop();
	await mainNavTabsPage.goToSchedule();
	await mainNavTabsPage.goToCMF();
	await mainNavTabsPage.goToCircuits();
	await mainNavTabsPage.goToDrawing();
	await mainNavTabsPage.goToCML();
	await mainNavTabsPage.goToECH();
	console.log('PEI Main grid Successful');
}

async function checkPLSSECHReport(page: Page) {
	await mainNavTabsPage.goToECH();
	await mainGridPage.clickRow1Column2();
	await mainGridToolbarPage.buttonReport.click();
	await reportsLightboxPage.downloadReport('PLSS ECH Report');
	console.log('PLSS ECH Report Check Successful');
}

async function checkPIService(page: Page) {
	await mainNavTabsPage.goToCorrosionLoop();
	await page
		.locator('(//tbody//*[@class="GridCellValue hasActivity"])[1]')
		.click();
	const corrosionLoopPage = new CorrosionLoopPage(page);
	await corrosionLoopPage.checkPIService();
	console.log('PI Service Check Successful');
}

async function checkDynamicForms(page: Page) {
	await mainNavTabsPage.tabCustomReports.click();
	await page.waitForTimeout(2000);
	await page
		.locator(
			"//div[@class='cen-combo-title' \
         or @class='cen-combo-title cen-combo-title--query-area' \
         or @class='cen-combo-title cen-combo-title--filter-area' \
         or @class='cen-combo-title cen-combo-title--report-area' \
         or @class='cen-combo-title']//select[1]"
		)
		.selectOption({ label: 'Dynamic Form' });
	await page.waitForTimeout(2000);
	await expect(page.locator("(//tr[@role='row'])[3]")).toBeVisible({
		timeout: 40000,
	});
	console.log('Dynamic Forms Check Successful');
}

async function verifySifAnalysisReport(page: Page) {
	await mainNavTabsPage.goToSIFAnalysis();
	await mainGridPage.clickRow1Column2();
	await mainGridToolbarPage.buttonReport.click();
	await reportsLightboxPage.downloadReport('SIF Analysis');
	console.log('SIF Analysis Report Check Successful');
}

//NEED TO FINISH
async function SIFAnalysisSuccessCriteria(page: Page, siteName: string) {
	await mainNavTabsPage.goToSIFAnalysis();
	await page.locator("//div[@class='gridCellActivityWrap']//a[1]").click();
	await page.locator("//i[@class='fa-regular fa-compass-drafting']").click();
	await page.locator("(//span[text()='Success Criteria'])[1]").click();
}

//RCM
async function MainGridCheckRCM(page: Page) {
	await mainNavTabsPage.goToRCM_Dashboard();
	await mainNavTabsPage.goToRCM_System();
	await mainNavTabsPage.goToRCM_FLOC();
	await mainNavTabsPage.goToRCM_Equipment();
	await mainNavTabsPage.goToRCM_Analysis();
	await mainNavTabsPage.goToRCM_Tasks();
	await mainNavTabsPage.goToRCM_Schedules();
	await mainNavTabsPage.goToRCM_ConditionHistory();
	await mainNavTabsPage.goToRCM_MaintenanceLibrary();
	await mainNavTabsPage.goToRCM_ECS();
	await mainNavTabsPage.goToRCM_Drawings();
	await mainNavTabsPage.goToRCM_CustomReports();
	console.log('RCM Main grid Successful');
}

async function verifyGlobalRSL(page: Page, siteName: string) {
	//await mainNavTabsPage.goToRCM()
	await mainNavTabsPage.goToRCM_MaintenanceLibrary();
	// adding if function in case the site does not have Actuator RSL to click on other global instead
	await page.locator('cen-toolbar [placeholder="Search"]').click();
	await page.locator('cen-toolbar [placeholder="Search"]').fill('Actuator RSL');
	await page.locator('cen-toolbar [placeholder="Search"]').press('Enter');
	await page.getByRole('link', { name: 'Actuator RSL' }).first().click();
	await page.waitForTimeout(3000);

	//if (await page.getByText('Error', { exact: true }).isVisible()) {
	if (
		await page
			.locator('div')
			.filter({ hasText: /^Error$/ })
			.isVisible()
	) {
		console.log('Global RSL "Actuator RSL" has crashed!');
		await page.close();
		//await page.waitForTimeout(3000)
		await page
			.locator('div')
			.filter({ hasText: /^Error$/ })
			.getByRole('button')
			.click();
		return;
	}
	console.log('Global RSL Check Successful');
}

async function checkConsoleLog(page: Page, site) {
	//Test Case 45586: Verify console log dynamic query
	// Added for WASM errors in cosole log
	page.on('console', (msg) => {
		const errorText = msg.text();
		if (errorText.startsWith('Error: dynamic query generation')) {
			console.log(site + ` Error text: "${msg.text()}"`);
		}
		if (errorText.includes('WASM')) {
			console.log(site + ` Error text: "${msg.text()}"`);
		}
	});
}

async function checkChecklistFindings(page: Page) {
	// Open ECH grid, filter by "Checklist Issues" - "YES" - Select the first in the grid and open findings. Expect at least one row in the grid.
	await mainNavTabsPage.goToECH();
	await mainGridToolbarPage.resetToFactorySettings();
	const mainGridFiltersPage = new MainGridFiltersPage(page);
	await mainGridFiltersPage.buttonExpandAppliedFiltersPanel.click();
	await page.locator("//span[.='Checklist Issues']").click();

	const filterCheckboxSelector =
		"(//div[@class='filter-link-wrap filter-bigCheckbox']//label)[3]";
	try {
		const filterCheckbox = await page.waitForSelector(filterCheckboxSelector, {
			timeout: 3000,
		});
		if (filterCheckbox) {
			// If the element is present, click on it
			await filterCheckbox.click();

			await page.locator("//span[text()='Show']").click();

			// Wait for the checkbox to be present on the page
			await page.waitForSelector(
				"//tr[@class='odd row_selected']//input[@class='biggerCheckbox']"
			);

			// Click on the checkbox
			await page
				.locator(
					"//tr[@class='odd row_selected']//input[@class='biggerCheckbox']"
				)
				.click();

			// Perform other actions after clicking the checkbox
			await mainGridToolbarPage.buttonCollectedData.click();

			// Click the checkbox again if needed
			await page
				.locator(
					"//tr[@class='odd row_selected']//input[@class='biggerCheckbox']"
				)
				.click();
		} else {
			console.log('Filter checkbox not present.');
			// Handle other cases or log the absence of the filter checkbox
		}
	} catch {}
}
