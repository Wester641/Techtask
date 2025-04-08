import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-252__Delete Newly Creating Records Functionality", async ({ page }) => {

  await page.setViewportSize(screenSize);

  await page.goto(URLs.contactRemindersPage);

  await page.waitForTimeout(3000);

  const firstRowBefore = await page.locator(Selectors.dataRow).first().allInnerTexts();

  await page.locator(Selectors.dataRow).first().click();

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.detailsModal).first()).toBeVisible();

  await page.locator(Selectors.deleteButton).first().click();

  await page.waitForTimeout(2000);

  await expect(page.getByText("Are you sure you want to delete this document?").first()).toBeVisible();

  await page.locator(Selectors.deleteModalButton).nth(1).click();

  await page.waitForTimeout(2000);

  await expect(page.getByText("Success").first()).toBeVisible();

  const firstRowAfter = await page.locator(Selectors.dataRow).first().allInnerTexts();

  expect(firstRowBefore).not.toEqual(firstRowAfter)
});