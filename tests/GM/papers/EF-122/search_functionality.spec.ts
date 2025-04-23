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

  const shortText = cell_text ? cell_text.slice(0, 15) : "";

  await page.locator(Selectors.search_input).fill(shortText || "paper");

  await expect(cell).toContainText(cell_text || "paper");
});
