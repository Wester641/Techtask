import { test, expect } from "@playwright/test";
// import { Selectors } from "./Selectors";
import { screenSize } from "../../../constants/links";

const randomOption = Math.floor(Math.random() * 3);

test("EF-211__Add New Issue Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/issues");

  await page.locator(".IconButton_label_block__Ri\\+VB").click();

  await page.locator(".react-select__control").first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator(
      "div:nth-child(2) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control > .react-select__value-container"
    )
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator('input[name="summary"]')
    .fill(".SelectField_select__nkrpi > .Select_select__input__6V5DK > ");

  await page.locator('textarea[name="description"]').fill("gggggg");

  await page
    .locator(
      "div:nth-child(7) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control"
    )
    .click();
  await page.getByRole("option").nth(randomOption).click();

  // ll

  await page
    .locator(
      "div:nth-child(8) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control"
    )
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator(
      "div:nth-child(9) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control"
    )
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(3000);
});

// await page.locator(Selectors.searchInput).nth(0).fill("Ben");
