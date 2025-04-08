import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-266__Verify that the import future is work correct", async ({ page }) => {

  await page.setViewportSize(screenSize);

  await page.goto(URLs.contactRemindersPage);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.settingsButton).first().click();

  await page.waitForTimeout(500);

  await page.locator(Selectors.importButton).first().click();

  await page.waitForTimeout(2000);

  expect(page.url()).toBe("https://app.easyfleet.ai/import-files/?link=contact_renewals");

  expect(await page.locator(Selectors.importTypeField).first().innerText()).toBe("Contact Renewal");
});