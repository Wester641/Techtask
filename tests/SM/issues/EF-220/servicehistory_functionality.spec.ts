import { test } from "@playwright/test";

import { screenSize } from "../../../../constants/links";

const randomOption = Math.floor(Math.random() * 3);

test("EF-220__Add Service History Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/service-history");
  await page.locator(".IconButton_label_block__Ri\\+VB").click();

  await page.locator(".react-select__value-container").first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page
    .locator(
      "div:nth-child(2) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control"
    )
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("button", { name: "Save Service Entry" }).click();
});
