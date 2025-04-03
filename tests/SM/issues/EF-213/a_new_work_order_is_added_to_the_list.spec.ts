import { test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";
const randomOption = Math.floor(Math.random() * 3);

test("  EF-213__A new Work Order is added to the list ", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/issues");
  await page.getByRole("cell", { name: "Unit #2099 12:31:03 PM" }).click();
  await page.locator(".IconButton_label_block__Ri\\+VB").click();

  await page
    .locator(".IssueStatus_status__solve__modal__item__Yj1C6")
    .first()
    .click();

  await page.locator(".react-select__value-container").first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .nth(2)
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator(
      "div:nth-child(3) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control"
    )
    .click();
  await page.getByRole("option").nth(randomOption).click();
  await page.getByRole("button", { name: "Save Work Order" }).click();
});
