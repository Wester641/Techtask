import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-61__fuel_summary_by_location_functionality", async ({ page }) => {
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

  for (const text of Selectors.user_info) {
    await expect(page.getByText(text).first()).toBeVisible();
  }
  await page
    .locator("div")
    .filter({ hasText: /^Cost\/Mile\$581\.57$/ })
    .locator("h4")
    .click();

  for (const header of Selectors.columnHeaders) {
    await expect(
      page.getByRole("columnheader", { name: header })
    ).toBeVisible();
  }

  await page
    .getByRole("navigation", { name: "pagination navigation" })
    .getByRole("listitem")
    .nth(2)
    .click();
  await page
    .getByRole("navigation", { name: "pagination navigation" })
    .getByRole("listitem")
    .first()
    .click();

  await page.waitForTimeout(5000);
});
