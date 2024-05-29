import { test as baseTest } from "@playwright/test";
import { loginPage } from "./pages/loginPage";
import { basePage } from "./pages/basePage";
import { homePage } from "./pages/homePage";
import { contactsPage } from "./pages/ContactsPage";

type myfixtures = {
  LoginPage: loginPage;
  BasePage: basePage;
  HomePage: homePage;
  ContactsPage: contactsPage;
};
export const test = baseTest.extend<myfixtures>({
  LoginPage: async ({ page }, use) => {
    const LoginPage = new loginPage(page);
    await use(LoginPage);
  },

  BasePage: async ({ page }, use) => {
    const BasePage = new basePage(page);
    await use(BasePage);
  },

  HomePage: async ({ page }, use) => {
    const HomePage = new homePage(page);
    await use(HomePage);
  },

  ContactsPage: async ({ page }, use) => {
    const ContactsPage = new contactsPage(page);
    await use(ContactsPage);
  },
});
