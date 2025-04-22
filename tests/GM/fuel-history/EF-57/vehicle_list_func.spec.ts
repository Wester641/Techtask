import { test, expect, Locator } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";
import exp from "constants";

test("EF-57__Vehicle List Functionality", async ({ page }) => {
  await page.goto(URLs.fuelHistory);
  const rows = page.locator(Selectors.id_cell);
  const rowCount = await rows.count();

  const importantColumns = [1, 2, 3, 4, 6, 7];

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const cells = row.locator("td");

    for (const colIndex of importantColumns) {
      const cell = cells.nth(colIndex);
      const cellText = await cell.textContent();
      expect(cellText?.trim()).not.toBe("");
    }
  }
});
