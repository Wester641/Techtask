import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-231__verify filters functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.vendorsPage);
  await page.waitForTimeout(10000);

  await page.locator(Selectors.filter_widget).first().click();

  await page.getByRole("listitem").nth(2).click();

  await page.getByRole("button", { name: "Apply" }).click();

  await page.waitForTimeout(3000);

  // TODO: Add assertions
});
