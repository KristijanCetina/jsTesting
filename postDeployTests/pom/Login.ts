import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly homepage: Locator
  readonly tocList: Locator
  readonly labelTestSite: Locator
  readonly titleIMS: Locator
  readonly logoIMS: Locator
  readonly labelTestSiteExpected: Locator
  readonly inputUsername: Locator
  readonly inputPassword: Locator
  readonly buttonConnect: Locator
  readonly linkForgotPassword: Locator
  readonly labelVersionCommit: Locator
  readonly labelVarsionBuildCommit: Locator
  readonly validationLabelIsRequired: Locator
  readonly buttonSignInWithGoogle: Locator
  readonly labelVersion: Locator

  constructor(page: Page) {
    this.page = page
    this.labelTestSite = page.locator('//*[.="This is the test website"]')
    this.titleIMS = page.locator('text=one integrity management system')
    this.logoIMS = page.locator('//*[@class="cen-login-intro-logo"]')
    this.inputUsername = page.locator('input[type="text"]')
    this.inputPassword = page.locator('input[type="password"]')
    this.linkForgotPassword = page.locator('//a[@class="forgot-password" and .="Forgot your password?"]')
    this.buttonConnect = page.locator('//button[.="Connect"]')
    this.labelVarsionBuildCommit = page.locator(process.env.VERSION_BUILD_COMMIT!)
    this.validationLabelIsRequired = page.locator('//label[.="Is required"]')
    this.buttonSignInWithGoogle = page.locator('//*[.="Sign in with Google"]')
    this.labelVersion = page.locator('//*[@id="footer"]/h3/span[1]')
  }

//   async verifyHomePageElements() {
//     await expect(this.titleIMS).toBeVisible()
//     await expect(this.logoIMS).toBeVisible()
//     await expect(this.labelTestSite).not.toBeVisible()
//     await expect(this.labelVarsionBuildCommit).toBeVisible()
//   }

  async verifyLoginValidaton() {
    await expect(this.linkForgotPassword).toBeVisible()
    await expect(this.inputUsername).toBeEditable()
    await expect(this.inputPassword).toBeEditable()
    await expect(this.buttonConnect).toBeEnabled()
    await this.buttonConnect.click()
    await expect(this.validationLabelIsRequired).toBeVisible()
    await expect(this.buttonSignInWithGoogle).toBeHidden()
    // await expect(this.inputUsername).toHaveText('Is required')
  }

  async verifyVersion() {
    await expect(this.labelVersion).toHaveText(process.env.VERSION_BUILD_COMMIT!)
  }

  async loginCorpAdm() {
    await this.page.keyboard.press('Escape')
    await this.inputUsername.fill(process.env.PROD_USERNAME!)
    await this.inputPassword.fill(process.env.PROD_PASSWORD!)
    await this.buttonConnect.click()
    await this.page.waitForTimeout(10000)

    //function to try second psw if the first is incorrect.
    if (await this.page.locator("//span[.='Wrong username or password']").isVisible()) {
      await this.inputUsername.clear()
      await this.inputUsername.fill(process.env.PROD_USERNAME!)
      await this.inputPassword.clear()
      await this.inputPassword.fill(process.env.PROD_PASSWORD2!)
      await this.buttonConnect.click()
      await this.page.waitForTimeout(10000)
      await expect(this.page.locator("//span[.='Wrong username or password']")).not.toBeVisible({ timeout: 5000 })
    }

    // Function to check if the the user is locked
    const isLocatorPresent = async () => {
      try {
        await this.page.locator("//span[contains(.,'You reached the limit of login attempts.')]").waitFor({ timeout: 5000 })
        return true
      } catch (error) {
        return false
      }
    }

    // Loop to check the locator and wait for 60 seconds if it's present
    while (await isLocatorPresent()) {
      await this.page.waitForTimeout(60000) // Wait for 60 seconds
      await this.buttonConnect.click()
    }
  }

//   async verifyLoginFunctionality() {
//     await this.inputUsername.fill(process.env.PROD_USERNAME!)
//     await this.inputPassword.fill(process.env.PROD_PASSWORD!)
//     await this.buttonConnect.click()
//     await expect(this.labelVarsionBuildCommit).toBeVisible()
//     await expect(this.labelTestSite).not.toBeVisible()
//     // await expect(this.inputUsername).toHaveText('Is required')
//   }
}
