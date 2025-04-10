import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize } from "../../../../../constants/links";

test("EF-220__ service history functionality", async ({ page, request }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/service-history");

  const rows = page.locator(Selectors.table_row);
  const count = await rows.count();

  if (count > 0) {
    const randomIndex = Math.floor(Math.random() * count);
    const randomRow = rows.nth(randomIndex);
    await expect(randomRow).toBeVisible();
    await randomRow.click();
  } else {
    console.log("No rows found to click.");
  }
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole("link").nth(4).click(),
  ]);
  expect(newPage).not.toBeNull();
  expect(newPage.url()).toContain("blob:");
});
