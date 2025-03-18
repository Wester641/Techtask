import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";

import { URLs } from "../../../../constants/links";

test("EF-159__Select add meter entry", async ({ page }) => {
  await page.goto(URLs.units);
  await page.waitForSelector(Selectors.unit_cell, {
    state: "attached",
    timeout: 10000,
  });
  await page.locator(Selectors.unit_cell).nth(1).click();
  await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
  await page.getByRole("link", { name: "Add Meter Entry" }).click();

  await expect(page).toHaveURL(URLs.addMeterHistoryFromUnitPage);
});
