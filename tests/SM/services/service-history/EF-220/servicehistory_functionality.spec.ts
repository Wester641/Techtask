import { test } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize } from "../../../../constants/links";
const randomOption = Math.floor(Math.random() * 3);

test("EF-220__ service history functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/service-history");
  await page.locator(Selectors.icon_button).click();

  await page.locator(Selectors.select_container).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.select_field2).click();
  await page.getByRole("option").nth(randomOption).click();
  await page.getByRole("button", { name: "Save Service Entry" }).click();
});
