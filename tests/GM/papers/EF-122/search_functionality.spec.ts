import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-122__Verify Search Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.papers);

  await page.waitForTimeout(5000);
  await expect(page.locator(Selectors.search_input)).toBeVisible();

  const cell = page.locator("role=cell").first();
  const cell_text = await cell.textContent();

  await page.locator(Selectors.search_input).fill(cell_text || "paper");

  await expect(cell).toContainText(cell_text || "paper");
});
