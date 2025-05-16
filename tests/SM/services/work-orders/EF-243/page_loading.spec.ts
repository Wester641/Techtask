import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-243__Test page loading and UI elements", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.workOrders);

  expect(page).toHaveURL(URLs.workOrders);
});
