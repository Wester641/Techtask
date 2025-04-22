import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-267__Tests the bulk-delete function is able to delete contact renewal records", async ({ page }) => {

  await page.setViewportSize(screenSize);

  await page.goto(URLs.contactRemindersPage);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.dataCell).first().click();

  await page.waitForTimeout(500);

  for (let i = 0; i < 11; i++) {
    expect(page.locator(Selectors.dataCell).nth(i)).toBeChecked();
  }
});