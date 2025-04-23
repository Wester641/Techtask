import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-204__Archive Forms Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await expect(page.locator(Selectors.headerRow).first()).toBeVisible();

  const headerNames = await page
    .locator(Selectors.headerRow)
    .first()
    .allInnerTexts();

  expect(headerNames).toStrictEqual([
    "Title\tDescription\tItem\tSubmissions\t",
  ]);

  const settingsButtonCount = await page
    .locator(Selectors.settingsButton)
    .count();

  expect(settingsButtonCount).toBeGreaterThan(0);

  await page.locator(Selectors.settingsButton).nth(5).click();

  await page.waitForTimeout(3000);

  const settingsNames = await page
    .locator(Selectors.settingsDropdown)
    .first()
    .allInnerTexts();

  expect(settingsNames).toStrictEqual([
    "Inspecton Items\nTitle and Setting\nDelete\nArchive",
  ]);

  await page.waitForTimeout(3000);

  await page.getByRole("menuitem", { name: "Archive" }).click();

  await page.waitForTimeout(2000);

  await expect(
    page.locator('[id="\\31 "]').getByText("Archived")
  ).toBeVisible();
});
