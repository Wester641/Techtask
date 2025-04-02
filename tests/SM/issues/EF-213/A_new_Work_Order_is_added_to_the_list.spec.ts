import { test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";
const randomOption = Math.floor(Math.random() * 3);

test("  EF-213__A new Work Order is added to the list ", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/work-orders");

  await page.locator(".IconButton_open_block_cont__HN7q1").click();

  await page.locator(".react-select__control").first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.selectField2).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.selectField3).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("button", { name: "Save Work Order" }).click();
});
