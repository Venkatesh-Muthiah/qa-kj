import { Locator, Page, expect } from "@playwright/test";
import { basePage } from "./basePage";
import { faker } from "@faker-js/faker";

export class contactsPage extends basePage {
  readonly addContactButtonLoc: Locator;
  readonly addContactDialogBox: Locator;
  readonly nameFieldLoc: Locator;
  readonly contactNumberLoc: Locator;
  readonly addressLoc: Locator;
  readonly saveButtonLoc: Locator;
  readonly contactsButtonLoc: Locator;
  readonly alerLoc: Locator;
  readonly searchBoxLoc: Locator;
  readonly firstTableNameLoc: Locator;
  readonly firstTableNumberLoc: Locator;
  readonly firstTableAddressLoc: Locator;
  readonly editCoontactLoc: Locator;
  readonly pagination: Locator;
  readonly pagination10: Locator;
  readonly pagination20: Locator;
  readonly pagination30: Locator;
  readonly uploadCSVButton: Locator;
  readonly uploadCSVDialogbox: Locator;
  readonly contactsLoc: Locator;
  readonly homeContactsLoc: Locator;

  constructor(protected page: Page) {
    super(page);
    this.contactsButtonLoc = page.getByRole("link", { name: "Contacts" });
    this.addContactButtonLoc = page.getByRole("button", {
      name: "ADD CONTACT",
    });
    this.addContactDialogBox = page.getByLabel("Add Contact");
    this.nameFieldLoc = page.getByLabel("Name");
    this.contactNumberLoc = page.getByLabel("Contact Number");
    this.addressLoc = page.getByLabel("Address");
    this.saveButtonLoc = page.getByRole("button", { name: "SAVE" });
    this.alerLoc = page.getByRole("alert");
    this.searchBoxLoc = page.getByLabel("Search");
    this.editCoontactLoc = page.getByLabel("Edit");
    this.pagination = page.getByLabel("Rows per page:");
    this.pagination10 = page.getByRole("option", { name: "10" });
    this.pagination20 = page.getByRole("option", { name: "20" });
    this.pagination30 = page.getByRole("option", { name: "30" });
    this.uploadCSVButton = page.getByRole("button", { name: "UPLOAD CSV" });
    this.uploadCSVDialogbox = page.getByLabel("Upload CSV");
    this.contactsLoc = page.locator(
      "//p[@class='MuiTablePagination-displayedRows css-1chpzqh']"
    );
    this.homeContactsLoc = page.locator(
      "(//p[@class='MuiTypography-root MuiTypography-body1 css-1bn0tpa'])[1]"
    );
  }

  async addContactsCRUDOperation() {
    //Testdata's
    var firstname1 = faker.person.firstName();
    var contactNumber1 = faker.string.numeric(10);
    var address1 = faker.location.streetAddress();

    var firstname2 = faker.person.firstName();
    var contactNumber2 = faker.string.numeric(10);
    var address2 = faker.location.streetAddress();

    //adding contact
    await this.clickElement(this.contactsButtonLoc);
    await this.clickElement(this.addContactButtonLoc);
    await this.elementUiTesting(
      this.addContactDialogBox,
      "addcontactdialogbox.png"
    );
    await this.fillText(this.nameFieldLoc, firstname1);
    await this.fillText(this.contactNumberLoc, contactNumber1);
    await this.fillText(this.addressLoc, address1);
    await this.clickElement(this.saveButtonLoc);
    await this.waitForElementToVisible(this.alerLoc);
    await this.validateElementText(this.alerLoc, "Contact Added Successfully");
    await this.waitForElementToHide(this.alerLoc);
    await this.fillText(this.searchBoxLoc, firstname1);
    await this.validateElementText(
      this.page.getByRole("cell", { name: firstname1 }),
      firstname1
    );
    await this.validateElementText(
      this.page.getByRole("cell", { name: contactNumber1 }),
      contactNumber1
    );
    await this.validateElementText(
      this.page.getByRole("cell", { name: address1 }),
      address1
    );

    //editing contact
    await this.clickElement(this.editCoontactLoc);
    await this.fillText(this.nameFieldLoc, firstname2);
    await this.fillText(this.contactNumberLoc, contactNumber2);
    await this.fillText(this.addressLoc, address2);
    await this.clickElement(this.saveButtonLoc);
    await this.waitForElementToVisible(this.alerLoc);
    await this.validateElementText(
      this.alerLoc,
      "Contact Updated Successfully"
    );
    await this.waitForElementToHide(this.alerLoc);
    await this.fillText(this.searchBoxLoc, firstname2);
    await this.validateElementText(
      this.page.getByRole("cell", { name: firstname2 }),
      firstname2
    );

    await this.validateElementText(
      this.page.getByRole("cell", { name: contactNumber2 }),
      contactNumber2
    );
    await this.validateElementText(
      this.page.getByRole("cell", { name: address2 }),
      address2
    );
  }

  public async verifyingPagination() {
    await this.clickElement(this.contactsButtonLoc);
    await this.waitTillNetworkIdle();
    await this.clickElement(this.pagination);
    await this.waitUntil10SecondsExplicitly();
    await this.clickElement(this.pagination20);
    await this.waitTillNetworkIdle();
    await this.clickElement(this.pagination);
    await this.waitUntil10SecondsExplicitly();
    await this.clickElement(this.pagination30);
    await this.waitTillNetworkIdle();
    await this.clickElement(this.pagination);
  }

  public async verifyingUploadCSV() {
    await this.clickElement(this.contactsButtonLoc);
    await this.clickElement(this.uploadCSVButton);
    await this.elementUiTesting(this.uploadCSVDialogbox, "uploadCSV.png");
  }

  public async verifyingNumberOfContacts() {
    await this.getTextAndVerifyText(this.homeContactsLoc, "10037");
    await this.clickElement(this.contactsButtonLoc);
    await this.getTextAndVerifyText(this.contactsLoc, "1-5 of 10037");
  }
}
