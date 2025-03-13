import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import {
  URLs,
  Credentials,
  screenSize,
  timeout,
  loginSelectors,
} from "../../../../constants/links";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
  await page.waitForURL(URLs.units, timeout);
});

test("EF-165__Issues Tab - Entries Verification", async ({ page }) => {
  page.on("response", async (response) => {
    if (response.url().match(URLs.api.ISSUES_TAB)) {
      try {
        const issueResponse = await response.json();
        const issueParse = JSON.stringify(issueResponse);
        issueParse.length === 0
          ? console.log(`This request is empty! lenght = ${issueParse.length}`)
          : console.log(`Result: ${issueParse}`);
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    }
  });
  await page.locator(Selectors.firstRowInTable).first().click();

  await page.waitForURL(URLs.unitsPage, timeout);

  await page.locator(Selectors.specsTabs).nth(3).click();
  await page.waitForTimeout(500);
  expect(page).toHaveURL(URLs.unitsPage);
});
