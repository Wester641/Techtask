import { test, expect } from "@playwright/test";
import { screenSize } from "../../../constants/links";

test("EF-210__Search Field Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/units");

  await page
    .locator("div")
    .filter({ hasText: /^Service management$/ })
    .click();

  await page
    .locator("div")
    .filter({ hasText: /^Issue$/ })
    .click();

  await page.getByRole("listitem").filter({ hasText: "Issue" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Issue Assign To$/ })
      .nth(1)
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Asset name$/ })
      .nth(1)
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Asset name$/ })
      .nth(1)
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Labels$/ })
      .nth(1)
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Priority$/ })
      .nth(1)
  ).toBeVisible();
});
