import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-60__fuel_summary_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Fuel$/ })
    .first()
    .click();
  await page.getByText(Selectors.fuel_summary).click();

  await page.locator(Selectors.search_fields).fill("LOVES #114");

  await page.waitForTimeout(5000);
});
