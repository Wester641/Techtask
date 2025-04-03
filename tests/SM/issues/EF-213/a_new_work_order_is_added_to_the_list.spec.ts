import { test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";
const randomOption = Math.floor(Math.random() * 3);

test("  EF-213__a new Work Order is added to the list ", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/issues");
  await page.getByRole("cell").nth(0).click();
  await page.locator(Selectors.first_cell).click();

  await page.locator(Selectors.status_solveItem).first().click();

  await page.locator(Selectors.value_container).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .nth(2)
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.select_field2).click();
  await page.getByRole("option").nth(randomOption).click();
  await page.getByRole("button", { name: "Save Work Order" }).click();
});
