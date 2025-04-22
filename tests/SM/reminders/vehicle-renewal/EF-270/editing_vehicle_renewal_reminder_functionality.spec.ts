import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-270__editing vehicle renewal reminder functionality", async ({
  page,
}) => {
  const randomOption = Math.floor(Math.random() * 3);

  await page.setViewportSize(screenSize);
  await page.goto(URLs.vehicleRemindersPage);

  await page.getByRole("cell").nth(1).click();
  await page.waitForTimeout(4000);
  await page.locator(Selectors.icon_button).click();

  await page.locator(Selectors.first_dropdown).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.second_dropdown).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.third_dropdown).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator('textarea[name="description"]').fill("22");
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(4000);
});
