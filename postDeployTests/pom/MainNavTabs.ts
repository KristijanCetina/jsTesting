import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class MainNavTabsPage {
    readonly page: Page
    readonly tabDashboard: Locator
    readonly tabFLOC: Locator
    readonly tabCorrosionLoops: Locator
    readonly tabEquipment: Locator
    readonly tabCircuits: Locator
    readonly tabComponents: Locator
    readonly tabSchedules: Locator
    readonly tabConditionHistoryECH: Locator
    readonly tabPlannedEvents: Locator
    readonly tabRBI: Locator
    readonly tabDefferal: Locator
    readonly tabDrawings: Locator
    readonly tabCustomReports: Locator
    readonly tabSystems: Locator
    readonly tabAnalysis: Locator
    readonly tabTasks: Locator
    readonly tabMaintenanceLibrary: Locator
    readonly tabChangeDefferal: Locator
    readonly tabECS: Locator
    readonly tabCampaigns: Locator
    readonly tabAnomalies: Locator
    readonly tabDegradationBarriers: Locator
    readonly tabJobs: Locator
    readonly tabProtocols: Locator
    readonly tabCMF: Locator
    readonly tabCircuit: Locator
    readonly tabCorrosionLoop: Locator
    readonly tabCML: Locator
    readonly tabSIFAnalysis: Locator
    //RCM
    readonly tabRCM_Dashboard: Locator
    readonly tabRCM_System: Locator
    readonly tabRCM_FLOC: Locator
    readonly tabRCM_Equipment: Locator
    readonly tabRCM_Analysis: Locator
    readonly tabRCM_Tasks: Locator
    readonly tabRCM_Schedules: Locator
    readonly tabRCM_ConditionHistory: Locator
    readonly tabRCM_MaintenanceLibrary: Locator
    readonly RCM_ChangeDeferral: Locator
    readonly tabRCM_ChangeDeferral: Locator
    readonly tabRCM_ECS: Locator
    readonly tabRCM_Drawings: Locator
    readonly tabRCM_CustomReports: Locator
    //RCM

    constructor(page: Page) {
        this.page = page
        this.tabDashboard = page.locator('//cen-mainmenu//*[.="Dashboard"]')
        this.tabFLOC = page.locator('//cen-mainmenu//*[.="FLOC"]')
        this.tabCorrosionLoop = page.locator('//cen-mainmenu//*[.="Corrosion Loops"]')
        this.tabEquipment = page.locator('//cen-mainmenu//*[.="Equipment"]')
        this.tabCircuits = page.locator('//cen-mainmenu//*[.="Circuits"]')
        this.tabComponents = page.locator('//cen-mainmenu//*[.="Components"]')
        this.tabConditionHistoryECH = page.locator('//cen-mainmenu//*[.="Condition History"]')
        this.tabPlannedEvents = page.locator('//cen-mainmenu//*[.="Planned Events"]')
        this.tabRBI = page.locator('//cen-mainmenu//*[.="RBI"]')
        this.tabDefferal = page.locator('//cen-mainmenu//*[.="Defferal"]')
        this.tabDrawings = page.locator('//cen-mainmenu//*[.="Drawings"]')
        this.tabCustomReports = page.locator("//span[text()='Custom reports']")
        this.tabSystems = page.locator('//cen-mainmenu//*[.="Systems"]')
        this.tabAnalysis = page.locator('//cen-mainmenu//*[.="Analysis"]')
        this.tabTasks = page.locator('//cen-mainmenu//*[.="Tasks"]')
        this.tabSchedules = page.locator('//cen-mainmenu//*[.="Schedules"]')
        this.tabMaintenanceLibrary = page.locator('//cen-mainmenu//*[.="Maintenance Library"]')
        this.tabChangeDefferal = page.locator('//cen-mainmenu//*[.="Change / Deferral"]')
        this.tabECS = page.locator('//cen-mainmenu//*[.="ECS"]')
        this.tabCampaigns = page.locator('//cen-mainmenu//*[.="Campaigns"]')
        this.tabAnomalies = page.locator('//cen-mainmenu//*[.="Anomalies"]')
        this.tabDegradationBarriers = page.locator('//cen-mainmenu//*[.="Degradation Barriers"]')
        this.tabJobs = page.locator('//cen-mainmenu//*[.="Jobs"]')
        this.tabProtocols = page.locator('//cen-mainmenu//*[.="Protocols"]')
        this.tabCMF = page.locator('//cen-mainmenu//*[.="CMF"]')
        this.tabCircuit = page.locator('//cen-mainmenu//*[.="Circuits"]')
        this.tabCorrosionLoops = page.locator('//cen-mainmenu//*[.="Corrosion Loops"]')
        this.tabCML = page.locator('//cen-mainmenu//*[.="CML"]')
        this.tabSIFAnalysis = page.locator("//a[@id='MenuSIFAnalysis']")
        //RCM
        this.tabRCM_Dashboard = page.locator('//cen-mainmenu//*[.="Dashboard"]')
        this.tabRCM_System = page.locator('//cen-mainmenu//*[.="Systems"]')
        this.tabRCM_FLOC = page.locator('//cen-mainmenu//*[.="FLOC"]')
        this.tabRCM_Equipment = page.locator('//cen-mainmenu//*[.="Equipment"]')
        this.tabRCM_Analysis = page.locator('//cen-mainmenu//*[.="Analysis"]')
        this.tabRCM_Tasks = page.locator('//cen-mainmenu//*[.="Tasks"]')
        this.tabRCM_Schedules = page.locator('//cen-mainmenu//*[.="Schedules"]')
        this.tabRCM_ConditionHistory = page.locator('//cen-mainmenu//*[.="Condition History"]')
        this.tabRCM_MaintenanceLibrary = page.locator('//cen-mainmenu//*[.="Maintenance Library"]')
        this.tabRCM_ChangeDeferral = page.locator('//cen-mainmenu//*[.="Change / Deferral"]')
        this.tabRCM_ECS = page.locator('//cen-mainmenu//*[.="ECS"]')
        this.tabRCM_Drawings = page.locator('//cen-mainmenu//*[.="Drawings"]')
        this.tabRCM_CustomReports = page.locator('//cen-mainmenu//*[.="Custom reports"]')
        //RCM    
    }

    async goToDrawing() {
        await this.tabDrawings.click()
        await expect(this.page).toHaveURL(/.*Drawing/)
        // await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToCML() {
        await this.tabCML.click()
        await expect(this.page).toHaveURL(/.*cml/)
        // await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToPEI() {
        await this.page.goto(process.env.BASE_URL + '#peifloc')
        await expect(this.page).toHaveURL(/.*#peifloc/)
    }

    async goToPEIDashboard() {
        await this.page.goto(process.env.BASE_URL + '#dashboard')
        await expect(this.page).toHaveURL(/.*#dashboard/)
    }

    async goToPLSS() {
        await this.page.goto(process.env.BASE_URL + '#plss')
        await expect(this.page).toHaveURL(/.*#plss/)
    }

    async goToRCM() {
        await this.page.goto(process.env.BASE_URL + '#rcmfloc')
        await expect(this.page).toHaveURL(/.*#rcmfloc/)
    }

    async goToFLOC() {
        await this.tabFLOC.click()
        await expect(this.page).toHaveURL(/.*floc/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToCorrosionLoops() {
        await this.tabCorrosionLoops.click()
        await expect(this.page).toHaveURL(/.*corrosionloop/)
        // await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToComponent() {
        await this.tabComponents.click()
        await expect(this.page).toHaveURL(/.*component/)
        // await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToSchedule() {
        await this.tabSchedules.click()
        await expect(this.page).toHaveURL(/.*schedule/)
        //   await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToECH() {
        await this.tabConditionHistoryECH.click()
        await expect(this.page).toHaveURL(/.*ech/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToCorrosionLoop() {
        await this.tabCorrosionLoops.click()
        await expect(this.page).toHaveURL(/.*corrosionloop/)
        // await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToCMF() {
        await this.tabCMF.click()
        await expect(this.page).toHaveURL(/.*cmf/)
        // await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToCircuits() {
        await this.tabCircuits.click()
        await expect(this.page).toHaveURL(/.*circuit/)
        //await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToFirstLink() {
        await this.page.locator('(//tbody//*[@class="GridCellValue hasActivity"])[1]').click()
    }

    async goToSIFAnalysis() {
        await this.tabSIFAnalysis.click()
        await expect(this.page).toHaveURL(/.*sifanalysis/)
    }

    //RCM
    async goToRCM_Dashboard() {
        await this.tabRCM_Dashboard.click()
        await expect(this.page).toHaveURL(/.*dashboard/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_System() {
        await this.tabRCM_System.click()
        await expect(this.page).toHaveURL(/.*rcmsystem/)
        //   await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_FLOC() {
        await this.tabRCM_FLOC.click()
        await expect(this.page).toHaveURL(/.*rcmfloc/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_Equipment() {
        await this.tabRCM_Equipment.click()
        await expect(this.page).toHaveURL(/.*rcmequipment/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_Analysis() {
        await this.tabRCM_Analysis.click()
        await expect(this.page).toHaveURL(/.*analysis/)
        //   await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }
    async goToRCM_Tasks() {
        await this.tabRCM_Tasks.click()
        await expect(this.page).toHaveURL(/.*task/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_Schedules() {
        await this.tabRCM_Schedules.click()
        await expect(this.page).toHaveURL(/.*rcmschedule/)
        //   await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_ConditionHistory() {

        await this.tabRCM_ConditionHistory.click()
        await expect(this.page).toHaveURL(/.*rcmech/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_MaintenanceLibrary() {
        await this.tabRCM_MaintenanceLibrary.click()
        await expect(this.page).toHaveURL(/.*maintlibrary/)
    }

    async goToRCM_ChangeDeferral() {
        await this.RCM_ChangeDeferral.click()
        await expect(this.page).toHaveURL(/.*changedeferral/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_ECS() {
        await this.tabRCM_ECS.click()
        await expect(this.page).toHaveURL(/.*ecs/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_Drawings() {
        await this.tabRCM_Drawings.click()
        await expect(this.page).toHaveURL(/.*Drawing/)
        //   await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }

    async goToRCM_CustomReports() {
        await this.tabRCM_CustomReports.click()
        await expect(this.page).toHaveURL(/.*queries/)
        //  await this.page.locator('//tbody/tr[1]/td[5]').isVisible()
    }
    //RCM
}
