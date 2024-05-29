import { expect } from "@playwright/test";
import { test } from "../fixtures";

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

test("navigating through all tabs", async ({ LoginPage, HomePage }) => {
  await LoginPage.openApplication();
  await LoginPage.userLogin();
  await LoginPage.validatePageUrl(testDataURL.home);
  await HomePage.testingUIWithMask();
  await HomePage.navigatingThroughAllTabsAndVerifyingTitle();
  await HomePage.testingTheToggleOperation();
});

test("testing the cards", async ({ LoginPage, HomePage }) => {
  await LoginPage.openApplication();
  await LoginPage.userLogin();
  await LoginPage.validatePageUrl(testDataURL.home);
  await HomePage.testing5cardsUI();
});

test("navigating through all tabs , while toggledoff", async ({
  LoginPage,
  HomePage,
}) => {
  await LoginPage.openApplication();
  await LoginPage.userLogin();
  await LoginPage.validatePageUrl(testDataURL.home);
  await HomePage.navigatingThroughAllTabsAndVerifyingTitleWhileToggledOff();
});
