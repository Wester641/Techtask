import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-223__Verify Tabs Switching", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForTimeout(3000);

  const tabAmount = await page.locator(Selectors.tabButton).count();

  for (let i = 1; i < tabAmount; i++) {
    await page.locator(Selectors.tabButton).nth(i).click();

    const tabName = await page.locator(Selectors.tabButton).nth(i).innerText();

    await page.waitForTimeout(1000);

    const dataAmount = await page.locator(Selectors.dataRow).count();

    if (dataAmount > 0) {
      for (let j = 0; j < dataAmount; j++) {
        const currentRow = page.locator(Selectors.dataRow).nth(j);

        const type = await currentRow.locator("td").nth(2).innerText();

        expect(type).toBe(tabName);
      }
    }

    else {
      console.log(`No data in "${tabName}" Section`);
    }
  }
});