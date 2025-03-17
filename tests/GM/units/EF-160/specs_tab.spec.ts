import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import {
  URLs,
  Credentials,
  screenSize,
  timeout,
  loginSelectors,
} from "../../../../constants/links";

test("EF-160__Specs Tabs - Widgets Verifications", async ({ page }) => {
  await page.goto(URLs.login);
  await page.locator(Selectors.firstRowInTable).first().click();

  await page.waitForURL(URLs.unitsPage, timeout);

  await page.locator(Selectors.specsTabs).nth(1).click();
  await page.waitForTimeout(500);
  await page.locator(Selectors.editPencilIcon).nth(3).click();
  // await expect(page).toHaveURL(
  //   URLs.updateSpecs
  // );
  await expect(page).toHaveURL(URLs.unitsUpdatePage);
  await page.waitForTimeout(2000);
  await page.goBack();
  await page.waitForTimeout(2000);
});
