import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";

import { URLs } from "../../../../constants/links";

test("EF-157__Select add issue navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto(URLs.units);
  await page.waitForSelector(Selectors.unit_cell, {
    state: "attached",
    timeout: 10000,
  });
  await page.locator(Selectors.unit_cell).nth(1).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole("link", { name: "Add Issue" }).click();

  await expect(page).toHaveURL(URLs.addIssueFromUnitPage);
});
