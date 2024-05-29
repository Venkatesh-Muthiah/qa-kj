import { expect } from "@playwright/test";
import { test } from "../fixtures";

const testDataURL = JSON.parse(
  JSON.stringify(require("../testData/urls.json"))
);

test("testing addcontacts flow", async ({
  LoginPage,
  HomePage,
  ContactsPage,
}) => {
  await LoginPage.openApplication();
  await LoginPage.userLogin();
  await LoginPage.validatePageUrl(testDataURL.home);
  await ContactsPage.addContactsCRUDOperation();
  await ContactsPage.verifyingUploadCSV();
  await ContactsPage.verifyingNumberOfContacts();
});
