import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-228__Verify Pagination Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForTimeout(3000);

  if (await page.getByRole('button', { name: 'Go to next page' }).isVisible()) {

    const firstPage = await page.locator(Selectors.dataRow).allInnerTexts();

    await page.getByRole('button', { name: 'Go to next page' }).click();
    await page.waitForTimeout(2000);

    const secondPage = await page.locator(Selectors.dataRow).allInnerTexts();

    expect(firstPage).not.toEqual(secondPage);

    await page.getByRole('button', { name: 'Go to previous page' }).click();
    await page.waitForTimeout(2000);

    expect(firstPage).toEqual(await page.locator(Selectors.dataRow).allInnerTexts());
  }
});
