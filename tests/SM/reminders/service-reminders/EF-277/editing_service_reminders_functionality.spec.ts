import { expect, test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

const random = Math.floor(Math.random() * 3);

test("EF-277__editing_service_reminders_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);

  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("cell").nth(3).click();
  await page.locator(Selectors.service_modal_icon).click();

  await page.locator(Selectors.first_dropdown).first().click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.second_dropdown).click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.time_interval).fill("1");
  await page.locator(Selectors.period).nth(2).click();
  await page.getByRole("option").nth(1).click();

  await page.locator(Selectors.due_soon_threshold).fill("2");

  await page.locator(Selectors.period).nth(3).click();
  await page.getByRole("option").nth(0).click();

  await page.locator(Selectors.meter_interval).nth(2).fill("30000");
  await page.locator(Selectors.meter_interval).nth(3).fill("2000");

  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(5000);

  expect(page.getByText("Successfully updated!")).toBeVisible();
});
