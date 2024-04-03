import { expect, Page, Locator } from '@playwright/test';
import { BaseMainOptions } from './BaseMain';

export class MyAccount {
	readonly page: Page;
	readonly buttonEdit: Locator;
	readonly buttonSave: Locator;

	// Common grids
	static DASHBOARD: string = 'Dashboard';
	static FLOC: string = 'FLOC';
	static EQUIPMENT: string = 'Equipment';
	static SCHEDULES: string = 'Schedules';
	static CONDITION_HISTORY: string = 'Condition History';
	static DRAWINGS: string = 'Drawings';
	static CUSTOM_REPORTS: string = 'Custom reports';

	// PEI
	static SYSTEMS: string = 'Systems';
	static CMF: string = 'CMF';
	static CORROSION_LOOPS: string = 'Corrosion Loops';
	static CIRCUITS: string = 'Circuits';
	static CML: string = 'CML';
	static COMPONENTS: string = 'Components';
	static PLANNED_EVENTS: string = 'Planned Events';
	static IOW: string = 'IOW';
	static RBI: string = 'RBI';
	static RBI_581: string = 'RBI 581';
	static DEFERRAL: string = 'Deferral';

	// RCM
	static ANALYSIS: string = 'Analysis';
	static TASKS: string = 'Tasks';
	static MAINTENANCE_LIBRARY: string = 'Maintenance Library';
	static CHANGE_DEFERRAL: string = 'Change / Deferral';
	static ECS: string = 'ECS';

	// PLSS
	static CAMPAIGNS: string = 'Campaigns';
	static ANOMALIES: string = 'Anomalies';
	static DEGRADATION_BARRIERS: string = 'Degradation Barriers';
	static SPARES: string = 'Spares';
	static FINDINGS: string = 'Findings';

	//SIS
	static SIF_ANALYSIS: string = 'SIF Analysis';
	static HAZOP: string = 'HAZOP';
	static LOPA: string = 'LOPA';
	static MASTER_EQUIPMENT: string = 'Master equipment';

	//FCM
	static JOBS: string = 'Jobs';
	static DESIGN: string = 'Design';

	constructor(page: Page) {
		this.page = page;
		this.buttonEdit = page.locator("//a[.='Edit']");
		this.buttonSave = page.locator("//input[@class='btn btn-save']");
	}

	private getCbox(mainGrid: string): Locator {
		return this.page
			.locator(
				`//table[@data-centest="cengrid"]//tr[contains(.,'${mainGrid}')]//input[@class='biggerCheckbox']`
			)
			.first();
	}

	private async checkMainGrids(module: string, grids) {
		await this.buttonEdit.click();
		let allPassed: boolean = true;
		for (const cbox of grids) {
			if (cbox) {
				await cbox.check();
			} else {
				allPassed = false;
				console.log(`${module} main grid ${cbox} doesn't exist!`);
			}
		}
		await this.buttonSave.click();
		await this.buttonEdit.waitFor({ timeout: 20000 });
		const baseMain = new BaseMainOptions(this.page);
		baseMain.closeNotification();
		if (allPassed) {
			console.log(`${module} Main Grids Check Successful`);
		}
	}

	async checkPEIMainGrids() {
		const checkBoxes = [
			this.getCbox(MyAccount.DASHBOARD),
			this.getCbox(MyAccount.SYSTEMS),
			this.getCbox(MyAccount.FLOC),
			this.getCbox(MyAccount.CMF),
			this.getCbox(MyAccount.CORROSION_LOOPS),
			this.getCbox(MyAccount.EQUIPMENT),
			this.getCbox(MyAccount.CIRCUITS),
			this.getCbox(MyAccount.CML),
			this.getCbox(MyAccount.COMPONENTS),
			this.getCbox(MyAccount.SCHEDULES),
			this.getCbox(MyAccount.CONDITION_HISTORY),
			this.getCbox(MyAccount.PLANNED_EVENTS),
			this.getCbox(MyAccount.IOW),
			this.getCbox(MyAccount.RBI),
			this.getCbox(MyAccount.DEFERRAL),
			this.getCbox(MyAccount.DRAWINGS),
			this.getCbox(MyAccount.CUSTOM_REPORTS),
		];
		await this.checkMainGrids('PEI', checkBoxes);
	}

	async checkRCMMainGrids() {
		const checkBoxes = [
			this.getCbox(MyAccount.DASHBOARD),
			this.getCbox(MyAccount.PLANNED_EVENTS),
			this.getCbox(MyAccount.SYSTEMS),
			this.getCbox(MyAccount.FLOC),
			this.getCbox(MyAccount.EQUIPMENT),
			this.getCbox(MyAccount.ANALYSIS),
			this.getCbox(MyAccount.TASKS),
			this.getCbox(MyAccount.MAINTENANCE_LIBRARY),
			this.getCbox(MyAccount.CHANGE_DEFERRAL),
			this.getCbox(MyAccount.ECS),
			this.getCbox(MyAccount.SCHEDULES),
			this.getCbox(MyAccount.CONDITION_HISTORY),
			this.getCbox(MyAccount.DRAWINGS),
			this.getCbox(MyAccount.CUSTOM_REPORTS),
		];
		await this.checkMainGrids('RCM', checkBoxes);
	}

	async checkPLSSMainGrids() {
		const checkBoxes = [
			this.getCbox(MyAccount.DASHBOARD),
			this.getCbox(MyAccount.DEFERRAL),
			this.getCbox(MyAccount.FLOC),
			this.getCbox(MyAccount.EQUIPMENT),
			this.getCbox(MyAccount.SYSTEMS),
			this.getCbox(MyAccount.CAMPAIGNS),
			this.getCbox(MyAccount.SCHEDULES),
			this.getCbox(MyAccount.IOW),
			this.getCbox(MyAccount.CONDITION_HISTORY),
			this.getCbox(MyAccount.ANOMALIES),
			this.getCbox(MyAccount.FINDINGS),
			this.getCbox(MyAccount.DEGRADATION_BARRIERS),
			this.getCbox(MyAccount.SPARES),
			this.getCbox(MyAccount.DRAWINGS),
			this.getCbox(MyAccount.CUSTOM_REPORTS),
		];
		await this.checkMainGrids('PLSS', checkBoxes);
	}

	async checkSIFMainGrids() {
		const checkBoxes = [
			this.getCbox(MyAccount.DASHBOARD),
			this.getCbox(MyAccount.PLANNED_EVENTS),
			this.getCbox(MyAccount.CHANGE_DEFERRAL),
			this.getCbox(MyAccount.FLOC),
			this.getCbox(MyAccount.EQUIPMENT),
			this.getCbox(MyAccount.SIF_ANALYSIS),
			this.getCbox(MyAccount.HAZOP),
			this.getCbox(MyAccount.LOPA),
			this.getCbox(MyAccount.MASTER_EQUIPMENT),
			this.getCbox(MyAccount.SCHEDULES),
			this.getCbox(MyAccount.CONDITION_HISTORY),
			this.getCbox(MyAccount.DRAWINGS),
			this.getCbox(MyAccount.CUSTOM_REPORTS),
		];
		await this.checkMainGrids('SIF', checkBoxes);
	}

	async checkFCMMainGrids() {
		const checkBoxes = [
			this.getCbox(MyAccount.DASHBOARD),
			this.getCbox(MyAccount.PLANNED_EVENTS),
			this.getCbox(MyAccount.JOBS),
			this.getCbox(MyAccount.FLOC),
			this.getCbox(MyAccount.EQUIPMENT),
			// This depends on BValue of 'Show Legacy FCM grids = 0' in application settings, so non-essential.
			//this.getCbox(MyAccount.SCHEDULES),
			this.getCbox(MyAccount.DESIGN),
			this.getCbox(MyAccount.CONDITION_HISTORY),
			this.getCbox(MyAccount.DRAWINGS),
			this.getCbox(MyAccount.CUSTOM_REPORTS),
		];
		await this.checkMainGrids('FCM', checkBoxes);
	}
}
