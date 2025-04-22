import { test } from "@playwright/test";
import { screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-269__add vehicle renewal reminder functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/reminders/vehicles");

  const randomOption = Math.floor(Math.random() * 3);

  await page.locator(Selectors.addButton).click();

  await page.locator(Selectors.firstDropdown).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.secondDropdown).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.thirdDropdown).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("spinbutton").fill("22");

  await page.getByRole("button", { name: "Save" }).click();
});
