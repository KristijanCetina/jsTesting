import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class ReportsLightboxPage {
    readonly page: Page
    readonly tabReports: Locator
    readonly tabCustomReports: Locator
    readonly inputSearch: Locator
    readonly checkboxGridFristRow: Locator
    readonly buttonGenerateAsPDF: Locator
    readonly buttonGenerateAsWord: Locator
    readonly buttonCloseReportsLightbox: Locator
    readonly elementLoader: Locator
    readonly buttonSettings: Locator
    readonly buttonPrint: Locator
    readonly buttonCombineInWord: Locator
    readonly buttonCombineInPDF: Locator
    readonly buttonPDFandWord: Locator
    readonly filter: {
        spanIsSystem: Locator
        cboxTrue: Locator
        aShow: Locator
    }

    constructor(page: Page) {
        this.page = page
        this.tabReports = page.locator('//a[.="Reports"]')
        this.tabCustomReports = page.locator('//a[.="Custom reports"]')
        this.elementLoader = page.locator('//cen-progress[@id="reportLightboxLoader"]/div[@class="elementLoader"]')
        this.inputSearch = page.locator('//*[@id="LightboxGenerate Report"]/div/div[2]/div[1]/div/cen-grid/div/div[1]/div/cen-search-toolbar/div/input')
        this.checkboxGridFristRow = page.locator('(//div[@class="customPanelLeft"]//*[@class="biggerCheckboxContainer"])[2]')
        this.buttonGenerateAsPDF = page.locator('//span[.="Generate as PDF"]')
        this.buttonGenerateAsWord = page.locator('//span[.="Generate as Word"]')
        this.buttonCloseReportsLightbox = page.locator('//button[@class="ui-dialog-titlebar-close"]')
        this.buttonSettings = page.locator('//a[.="Settings"]')
        this.filter = {
            spanIsSystem: page.locator('//span[@class="filter-expandable-title" and text()="Is System"]'),
            cboxTrue: page.locator('//div[@class="filter-column-wrap"]//input[@class="biggerCheckbox" and @id="True"]'),
            aShow: page.locator('//a[contains(@title, "Show ")]')
        }
    }

    getCheckBox(reportName: string): Locator {
        return this.page.locator(`//span[text()="${reportName}"]//ancestor::tr//child::input[@class="biggerCheckbox"]`)
    }

    async downloadReport(reportName: string) {
        await expect(this.buttonGenerateAsPDF).toBeVisible()      
        await this.tabCustomReports.click()
        await this.checkboxGridFristRow.waitFor({timeout:60000})

        // Filter on System Reports, to exclude possible user reports with similar reportName.
        // if (isSystemReport) {
        //     await this.checkboxGridFristRow.waitFor({timeout:60000})
        //     await expect(this.filter.spanIsSystem).toBeVisible()
        //     await this.filter.spanIsSystem.click()
        //     await expect(this.filter.cboxTrue).toBeVisible()
        //     await this.filter.cboxTrue.check({ force: true })
        //     await this.filter.aShow.waitFor({ timeout: 10000 })
        //     await this.filter.aShow.click()
        //     await this.page.waitForTimeout(5000)
        // }

        const cbox: Locator = this.getCheckBox(reportName)
        await expect(cbox).toBeVisible()
        await cbox.check()

        // Note that Promise.all prevents a race condition
        // between clicking and waiting for the download.
        const [downloadPDF] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            this.page.waitForEvent('download'),
            // Triggers the download.
            this.buttonGenerateAsPDF.click(),
            //this.buttonGenerateAsWord.click()
        ])
        const reliablePath = downloadPDF.suggestedFilename()
        await downloadPDF.saveAs(reliablePath)

        // wait for download to complete
        // const path = downloadPDF.suggestedFilename()
        //console.log("Report: " + reportName)
        //console.log("Downloaded filename: " + reliablePath)
        await downloadPDF.failure()
        const fs = require('fs')
        var stats = fs.statSync(reliablePath)
        var fileSizeInBytes = stats.size
        //console.log("Size: " + fileSizeInBytes)
        fs.stat(reliablePath, (err, fileStats) => {
            if (err || stats.size < 45000) {
                console.log(err)
                console.log("PDF is to small!")
                console.log(reportName + " failed")
            } else {
                //console.log(fileStats)
                downloadPDF.delete()
                fs.unlinkSync(reliablePath)
                //console.log("Downloaded file " + reliablePath + " has been deleted")
                //console.log(reportName + " successful")
            }
        })
        await this.buttonCloseReportsLightbox.click()
    }
}
