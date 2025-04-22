import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-259__Verify Purchase Orders Page Loads", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.purchaseOrders);

  await page.waitForTimeout(5000);

  expect(page.getByRole("columnheader").first()).toBeVisible();
  expect(page.getByRole("cell").first()).toBeVisible();
});
