import { Locator, Page, expect, test } from "@playwright/test";

export class basePage {
  constructor(protected page: Page) {}

  public async validatePageUrl(url: string) {
    await test.step(`Validating that a correct value of URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url);
    });
  }

  public async validateTitle(expectedTitle: string) {
    const actualTitle: string = await this.page.title();
    expect(actualTitle).toEqual(expectedTitle);
    console.log(`Actual alert text: ${actualTitle}`);
    console.log(`Expected alert text: ${expectedTitle}`);
  }

  public async validateElementText(element: Locator, expectedText: any) {
    await test.step(`Validating that a correct elemet text is  ${expectedText}`, async () => {
      const actualText = await element.textContent();
      await expect(element).toContainText(expectedText);
      console.log(`Actual text: ${actualText}`);
      console.log(`Expected text: ${expectedText}`);
    });
  }

  public async clickElement(element: Locator) {
    await test.step(`Clicking the '${element}' element`, async () => {
      await element.click();
    });
  }

  public async fillText(element: Locator, textToFill: string) {
    await test.step(`Filling '${textToFill}' into the '${element}' element`, async () => {
      await element.fill(textToFill);
    });
  }

  public async getTextAndVerifyText(element: Locator, textToVerify: string) {
    const getElement = await element.textContent();
    console.log(`getText element is ${getElement}`);
    expect(getElement?.includes(textToVerify));
  }

  public async waitForElementToVisible(element: Locator) {
    await element.waitFor({ state: "visible" });
  }

  public async waitForElementToHide(element: Locator) {
    await element.waitFor({ state: "hidden" });
  }

  public async takeFullpageScreenshot() {
    await this.page.screenshot({
      path: "tests/screenshots/" + Date.now() + "FullPage.png",
      fullPage: true,
    });
  }

  public async takeElementScreenshot(element: Locator) {
    await element.screenshot({
      path: "tests/screenshots/" + Date.now() + "element.png",
    });
  }

  public async fullScreenUiTesting(filePath: string) {
    await expect(this.page).toHaveScreenshot(filePath, { fullPage: true });
  }

  public async maskedUiTesting(element: Locator, filePath: string) {
    await expect(this.page).toHaveScreenshot(filePath, { mask: [element] });
  }

  //count of masked elements can be added above 2 also.
  public async multipleMaskedUiTesting(
    filePath: string,
    element1: Locator,
    element2: Locator
  ) {
    await expect(this.page).toHaveScreenshot(filePath, {
      mask: [element1, element2],
    });
  }

  public async elementUiTesting(element: Locator, filePath: string) {
    await expect(element).toHaveScreenshot(filePath);
  }

  public async maskedElementUiTesting(
    element: Locator,
    filePath: string,
    maskedElement: Locator
  ) {
    await expect(element).toHaveScreenshot(filePath, { mask: [maskedElement] });
  }

  public async multipleMaskedElementUiTesting(
    element: Locator,
    filePath: string,
    maskedElement1: Locator,
    maskedElement2: Locator,
    maskedElement3: Locator,
    maskedElement4: Locator
  ) {
    await expect(element).toHaveScreenshot(filePath, {
      mask: [maskedElement1, maskedElement2, maskedElement3, maskedElement4],
    });
  }

  async waitTillNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }

  async waitUntil05SecondsExplicitly() {
    await this.page.waitForTimeout(5000);
  }

  async waitUntil10SecondsExplicitly() {
    await this.page.waitForTimeout(10000);
  }

  async waitUntil20SecondsExplicitly() {
    await this.page.waitForTimeout(20000);
  }

  async waitUntil30SecondsExplicitly() {
    await this.page.waitForTimeout(30000);
  }
}
