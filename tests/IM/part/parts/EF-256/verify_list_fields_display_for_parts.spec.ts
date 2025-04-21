import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-256__verify list fields display", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);
  await expect(page.locator(Selectors.list_of_parts)).toBeVisible();
});
