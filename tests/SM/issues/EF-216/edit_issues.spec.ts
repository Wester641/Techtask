import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors, time, today } from "./Selectors";

const randomOption = Math.floor(Math.random() * 3);

test("EF-216__Edit issue functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/issues");
  await page.getByRole("cell").nth(0).click();

  let i = 0;
  while (i < 5) {
    expect(page.locator(Selectors.detail_information).nth(i)).toBeVisible();
    i++;
  }

  await page.getByRole("button").filter({ hasText: /^$/ }).nth(3).click();
  expect(page.locator(Selectors.edit_form)).toBeVisible();

  let j = 0;
  while (j < 5) {
    await page.locator(Selectors.edit_form_field).nth(j).click();
    await page.getByRole("option").nth(randomOption).click();
    j++;
  }

  await page
    .locator(Selectors.summary_field)
    .fill(`Edited summary ${today} at ${time}`);

  await page
    .locator(Selectors.description_field)
    .nth(0)
    .fill(`Edited description ${today} at ${time}`);

  await page.getByRole("button", { name: "Save" }).scrollIntoViewIfNeeded();

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(5000);
  expect(page.getByText("Issue is updated")).toBeVisible();
});
