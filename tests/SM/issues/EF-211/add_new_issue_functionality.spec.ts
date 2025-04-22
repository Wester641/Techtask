import { test } from "@playwright/test";
import { today } from "./Selectors";
import { screenSize } from "../../../../constants/links";

const randomOption = Math.floor(Math.random() * 3);

test("EF-211__Add New Issue Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/issues");

  await page.locator(".IconButton_label_block__Ri\\+VB").click();

  await page.locator(".react-select__control").first().click();
  await page.getByRole("option").nth(randomOption).click();

  for (let i = 0; i < 5; i++) {
    await page.locator(".css-19bb58m").nth(i).click();
    await page.getByRole("option").nth(randomOption).click();
  }

  await page
    .locator('input[name="summary"]')
    .fill(`This summary added ${today}`);

  await page
    .locator('textarea[name="description"]')
    .fill(`This decsription added ${today}`);

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(3000);
});
