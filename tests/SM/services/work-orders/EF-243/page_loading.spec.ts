import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-243__Test page loading and UI elements", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);

  await page.getByRole("heading").nth(1).click();

  await page.getByText("Service", { exact: true }).click();
  expect(page.locator(Selectors.dropdown)).toBeVisible();
  await page.getByText("Work orders").click();
  expect(page).toHaveURL(URLs.workOrders);
});
