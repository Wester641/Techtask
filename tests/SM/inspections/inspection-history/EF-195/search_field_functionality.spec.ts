import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-195__Search Field Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_history);
  await page.waitForLoadState("domcontentloaded");

  const cellLocator = page.getByRole("cell").first();
  await expect(cellLocator).toBeVisible();

  const cellText = await cellLocator.innerText();

  await page.locator(Selectors.searchInput).fill(cellText || "paper");

  expect(cellLocator).toContainText(cellText || "paper");
});
// npx playwright test --grep "EF-195__Search Field Functionality"
