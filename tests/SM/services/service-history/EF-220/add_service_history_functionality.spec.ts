import { expect, test } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";
const randomOption = Math.floor(Math.random() * 3);

test("EF-220__Add service history functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceHistory);

  await page.getByText("Add Service Entry").click();

  await page.locator(Selectors.select_value).nth(0).click();
  await page.getByRole("option").nth(randomOption).click();
  await page
    .locator("div")
    .filter({ hasText: /^Nearest vendors$/ })
    .locator("div")
    .click();

  for (let i = 1; i < 5; i++) {
    await page.locator(Selectors.select_value).nth(i).click();
    await page.waitForTimeout(300);
    await page.getByRole("option").nth(randomOption).click();
  }

  await page.locator(Selectors.select_value).nth(8).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("button", { name: "Save Service Entry" }).click();
  await expect(
    page.getByText("Service History successfully created")
  ).toBeVisible();
});
