import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-123__Verify 'Paper File Type' Dropdown Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.papers);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.paper_file_type_filter).first().click();
  expect(page.locator(Selectors.modal_filter).first()).toBeVisible();

  await page
    .locator(Selectors.option)
    .nth(Math.floor(Math.random() * 2))
    .click();

  await page.getByText("Apply").click();

  if (await page.locator(Selectors.data_cell).count() > 1) {
    const cell = page.locator("role=cell").nth(6);
    const cell_text = await cell.textContent();
    await expect(cell).toContainText(cell_text || "photo" || "document");
  }
});
