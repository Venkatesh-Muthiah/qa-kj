import { Locator, Page, expect } from "@playwright/test";
import { basePage } from "./basePage";

export class homePage extends basePage {
  readonly homeButtonLoc: Locator;
  readonly homePageTitleLoc: Locator;
  readonly contactsButtonLoc: Locator;
  readonly contactsPageTitleLoc: Locator;
  readonly groupsButtonLoc: Locator;
  readonly groupPageTitleLoc: Locator;
  readonly messageButtonLoc: Locator;
  readonly messagePageTitleLoc: Locator;
  readonly logoffButtonLoc: Locator;
  readonly toggleOff: Locator;
  readonly toggleOn: Locator;
  readonly dynamicTabsLoc: Locator;
  readonly cardsLoc: Locator;
  readonly hideCount1Loc: Locator;
  readonly hideCount2Loc: Locator;
  readonly hideCount3Loc: Locator;
  readonly hideCount4Loc: Locator;
  readonly closedSidebarLoc: Locator;
  readonly totalSmsSentLoc: Locator;
  readonly hideDynamicData1ofTotalSmsSentLoc: Locator;
  readonly addContactButtonLoc: Locator;
  readonly addContactDialogBox: Locator;
  readonly nameFieldLoc: Locator;
  readonly phoneNumberLoc: Locator;
  readonly addressLoc: Locator;
  readonly saveButtonLoc: Locator;

  constructor(protected page: Page) {
    super(page);
    this.homeButtonLoc = page.getByRole("link", { name: "Home" });
    this.homePageTitleLoc = page.getByRole("heading", { name: "Home" });
    this.contactsButtonLoc = page.getByRole("link", { name: "Contacts" });
    this.contactsPageTitleLoc = page.getByRole("heading", { name: "Contacts" });
    this.groupsButtonLoc = page.getByRole("link", { name: "Groups" });
    this.groupPageTitleLoc = page.getByRole("heading", { name: "Groups" });
    this.messageButtonLoc = page.getByRole("link", { name: "Message" });
    this.messagePageTitleLoc = page.getByRole("heading", { name: "Message" });
    this.logoffButtonLoc = page.getByRole("link", { name: "Logoff" });
    this.toggleOff = page.getByTestId("ChevronLeftIcon");
    this.toggleOn = page.getByTestId("MenuIcon");
    this.dynamicTabsLoc = page.locator(".MuiBox-root.css-0");
    this.cardsLoc = page.locator(
      "//div[contains(@style,'display: flex; flex-direction: row; margin-top: 1.5%')]"
    );
    this.hideCount1Loc = page.locator(
      "(//p[@class='MuiTypography-root MuiTypography-body1 css-1bn0tpa'])[1]"
    );
    this.hideCount2Loc = page.locator(
      "(//p[@class='MuiTypography-root MuiTypography-body1 css-1bn0tpa'])[2]"
    );
    this.hideCount3Loc = page.locator(
      "(//p[@class='MuiTypography-root MuiTypography-body1 css-1bn0tpa'])[3]"
    );
    this.hideCount4Loc = page.locator(
      "(//p[@class='MuiTypography-root MuiTypography-body1 css-1bn0tpa'])[4]"
    );
    this.closedSidebarLoc = page.locator(
      '//div[contains(@class,"MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiDrawer-paper")]'
    );
    this.totalSmsSentLoc = page.locator(".MuiBox-root.css-1t67seh");
    this.hideDynamicData1ofTotalSmsSentLoc = page.locator(
      ".MuiTypography-root MuiTypography-body1 css-193dl0o"
    );
  }

  async navigatingThroughAllTabsAndVerifyingTitle() {
    await this.clickElement(this.homeButtonLoc);
    await this.validateElementText(this.homePageTitleLoc, "Home");
    await this.clickElement(this.contactsButtonLoc);
    await this.validateElementText(this.contactsPageTitleLoc, "Contacts");
    await this.clickElement(this.groupsButtonLoc);
    await this.validateElementText(this.groupPageTitleLoc, "Groups");
    await this.clickElement(this.messageButtonLoc);
    await this.validateElementText(this.messagePageTitleLoc, "Message");
  }

  public async testingUIWithMask() {
    this.maskedUiTesting(this.dynamicTabsLoc, "home.png");
  }

  public async testingTheToggleOperation() {
    await this.clickElement(this.toggleOff);
    await this.maskedUiTesting(this.dynamicTabsLoc, "toggleoff.png");
    await this.clickElement(this.toggleOn);
    await this.maskedUiTesting(this.dynamicTabsLoc, "toggleon.png");
  }

  public async testing5cardsUI() {
    await this.multipleMaskedElementUiTesting(
      this.cardsLoc,
      "cards.png",
      this.hideCount1Loc,
      this.hideCount2Loc,
      this.hideCount3Loc,
      this.hideCount4Loc
    );
  }

  async navigatingThroughAllTabsAndVerifyingTitleWhileToggledOff() {
    await this.clickElement(this.toggleOff);
    await this.clickElement(this.homeButtonLoc);
    await this.validateElementText(this.homePageTitleLoc, "Home");
    await this.clickElement(this.contactsButtonLoc);
    await this.validateElementText(this.contactsPageTitleLoc, "Contacts");
    await this.clickElement(this.groupsButtonLoc);
    await this.validateElementText(this.groupPageTitleLoc, "Groups");
    await this.clickElement(this.messageButtonLoc);
    await this.validateElementText(this.messagePageTitleLoc, "Message");
  }
}
