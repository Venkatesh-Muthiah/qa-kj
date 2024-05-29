import { expect } from "@playwright/test";
import { test } from "../fixtures";

//importing testdata's

const testDataURL = JSON.parse(
  JSON.stringify(require("../testData/urls.json"))
);

test("user login in the application", async ({ page, LoginPage, BasePage }) => {
  await LoginPage.openApplication();
  await BasePage.fullScreenUiTesting("loginPage.png");
  await BasePage.validatePageUrl(testDataURL.login);
  await BasePage.validateTitle("Krishna Jewellery");
  await LoginPage.userLogin();
  await LoginPage.verifyAlert("Login Success");
  await BasePage.validatePageUrl(testDataURL.home);
});

test("user login with wrong credentials", async ({ LoginPage, BasePage }) => {
  await LoginPage.openApplication();
  await BasePage.validatePageUrl(testDataURL.login);
  await BasePage.validateTitle("Krishna Jewellery");
  await LoginPage.invalidUserLogin();
  await LoginPage.verifyAlert("Invalid Email");
  await BasePage.validatePageUrl(testDataURL.login);
});
