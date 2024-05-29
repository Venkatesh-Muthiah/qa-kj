import { Locator, Page, expect } from "@playwright/test";
import { basePage } from "./basePage";

//importing testdata's
const testData = JSON.parse(
  JSON.stringify(require("../testData/loginCredentials.json"))
);
const testDataURL = JSON.parse(
  JSON.stringify(require("../testData/urls.json"))
);

// Test -- env
const env = testData.qaEnv;

// Test --URL
const url = env.url;
const email = env.email;
const password = env.password;

export class loginPage extends basePage {
  readonly emailLoc: Locator;
  readonly passwordLoc: Locator;
  readonly loginButtonLoc: Locator;
  readonly alertLoc: Locator;
  readonly alertMessage: Locator;
  readonly BrandnameLoc: Locator;
  readonly LoginTextLoc: Locator;

  constructor(protected page: Page) {
    super(page);
    this.emailLoc = page.getByPlaceholder("Email");
    this.passwordLoc = page.getByPlaceholder("Password");
    this.loginButtonLoc = page.getByRole("button", { name: "Login" });
    this.alertLoc = page.getByRole("alert");
  }

  async openApplication() {
    await this.page.goto(url);
    await this.waitTillNetworkIdle();
  }

  async userLogin() {
    await this.fillText(this.emailLoc, email);
    await this.fillText(this.passwordLoc, password);
    await this.clickElement(this.loginButtonLoc);
  }

  async invalidUserLogin() {
    await this.fillText(this.emailLoc, testData.invalid.email);
    await this.fillText(this.passwordLoc, testData.invalid.password);
    await this.clickElement(this.loginButtonLoc);
  }

  async verifyAlert(expectedAlert: string) {
    const locatorOfAlert = this.alertLoc;
    await this.waitForElementToVisible(locatorOfAlert);
    await this.validateElementText(locatorOfAlert, expectedAlert);
    await this.waitForElementToHide(locatorOfAlert);
  }
}
