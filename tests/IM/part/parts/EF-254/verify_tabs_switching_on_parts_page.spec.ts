import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-254__verify_tabs_switching_on_parts_page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);
  for (let i = 1; i < 3; i++) {
    await page.getByRole("tab").nth(i).click();
    await expect(page.locator(Selectors.mainContainer)).toBeVisible();
  }
  await page.getByRole("tab", { name: "Archived" }).click();
});
