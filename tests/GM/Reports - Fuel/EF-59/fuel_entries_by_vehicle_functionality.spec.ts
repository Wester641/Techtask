import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-59__fuel_entries_by_vehicle_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  // await page.getByText("Fuel3").click();
  await page
    .locator("div")
    .filter({ hasText: /^Fuel$/ })
    .first()
    .click();
  await page.getByText(Selectors.fuel_entries).click();

  // Check if a widget with the specified column headers exists

  for (const header of Selectors.columnHeaders) {
    await expect(
      page.getByRole("columnheader", { name: header })
    ).toBeVisible();
  }
  // Enter a vehicle name in the search field
  await page.locator(Selectors.search_fields).fill("Vehicle 14");
});
