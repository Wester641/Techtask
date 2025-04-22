import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-125__Verify Search Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.papers);

  await page.locator(Selectors.filter_widget).nth(1).click();

  expect(page.locator(Selectors.modal_filter)).toBeVisible();

  const random_item = Math.floor(Math.random() * 2);

  await page.locator(Selectors.list_item).nth(random_item).click();

  await page.getByText("Apply").click();

  await page.waitForTimeout(3000);
});
