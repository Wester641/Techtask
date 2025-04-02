import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-193__Inspections History Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_history);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.managementTab).nth(1).click();

  await page.waitForTimeout(1000);

  await page
    .locator("div")
    .filter({ hasText: /^Inspections$/ })
    .click();

  await expect(page.locator(Selectors.selectDropdown)).toBeVisible();

  await page.waitForTimeout(500);

  await page.locator(Selectors.inspectionsTab).first().click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const headerNames = await page
    .locator(Selectors.headerTable)
    .first()
    .allInnerTexts();

  await expect(headerNames).toStrictEqual([
    "Vehicle\tVehicle Group\tSubmitted\tDuration\tInspection\tUser\tLocation Exception\tFailed Items\t",
  ]);
});
