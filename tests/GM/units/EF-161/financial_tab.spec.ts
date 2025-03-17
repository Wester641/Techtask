import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, timeout } from "../../../../constants/links";

test("EF-161__Financial Tabs - Widgets Verifications", async ({ page }) => {
  await page.goto(URLs.login);
  await page.locator(Selectors.firstRowInTable).first().click();

  await page.waitForURL(URLs.unitsPage, timeout);

  await page.locator(Selectors.specsTabs).nth(2).click();
  await page.waitForTimeout(500);
  await page.locator(Selectors.editPencilIcon).nth(12).click();
  // await expect(page).toHaveURL(
  //   URLs.updateFinance
  // );
  await expect(page).toHaveURL(URLs.unitsUpdatePage);
  await page.waitForTimeout(2000);
  await page.goBack();
  await page.waitForTimeout(2000);
});
