import { expect, Locator, Page } from '@playwright/test'
import { MainGridToolbarPage } from './MainGridToolbar'


export class Common {
    readonly page: Page
    readonly mainGrid: MainGridToolbarPage

    constructor(page: Page) {
        this.page = page
        this.mainGrid = new MainGridToolbarPage(page)
    }

    async waitForGridToLoad() {
        await this.mainGrid.waitForGridToLoad()
    }
}