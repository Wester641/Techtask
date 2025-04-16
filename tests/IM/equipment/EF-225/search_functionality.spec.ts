import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-225__Verify Search Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForTimeout(3000);

  const rows = await page.locator(Selectors.dataRow).all();
  const names: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = await row.locator("td").nth(1).innerText().catch(() => null);
    if (name) {
      names.push(name.trim());
    }
  }

  const randomName = names[Math.floor(Math.random() * names.length)];
  
  await page.locator(Selectors.searchInput).fill(randomName);
  await page.waitForTimeout(3000);

  const rowAmount = await page.locator(Selectors.dataRow).count();

  if (rowAmount > 0) {
    for (let i = 0; i < rowAmount; i++) {
      const currentRow = await page.locator(Selectors.dataRow).nth(i);

      const type = await currentRow.locator("td").nth(1).innerText();
      expect(type).toContain(randomName);
    }
  }
});