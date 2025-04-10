import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-276__add_service_reminders_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);
  const random = Math.floor(Math.random() * 3);

  await page.locator(Selectors.icon_button).click();

  await page.locator(Selectors.first_dropdown).first().click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.second_dropdown).first().click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.third_dropdown).click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.fourth_dropdown).click();
  await page.getByRole("option").nth(random).click();

  await page.getByText("Everymi").click();
  await page.getByPlaceholder("25").fill("30000");

  await page.getByRole("button", { name: "Save" }).click();
});
