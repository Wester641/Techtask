import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-126__Verify Table Row Interaction on 'Papers' Page", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.papers);

  await page.waitForTimeout(3000);

  await page.getByRole("cell").first().click();
  expect(page.locator(Selectors.detail_information_widget)).toBeVisible();

  await page.waitForTimeout(5000);

  await page.locator("svg:nth-child(4)").click();
  expect(page.locator(Selectors.detail_information_widget)).not.toBeVisible();
});
