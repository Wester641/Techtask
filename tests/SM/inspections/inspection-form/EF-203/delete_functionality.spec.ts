import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-203__Delete Forms Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await page.addStyleTag({
    content: `
      ${Selectors.headerRow},
      ${Selectors.settingsButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.headerRow},
      ${Selectors.settingsButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerRow).first()).toBeVisible();

  const headerNames = await page.locator(Selectors.headerRow).first().allInnerTexts();

  await expect(headerNames).toStrictEqual(['Title\tDescription\tItem\tSubmissions\t']);

  const settingsButtonCount = await page.locator(Selectors.settingsButton).count();
  
  expect(settingsButtonCount).toBeGreaterThan(0);

  await page.locator(Selectors.settingsButton).nth(2).click();

  await page.waitForTimeout(3000);
  
  const settingsNames = await page.locator(Selectors.settingsDropdown).first().allInnerTexts();

  await expect(settingsNames).toStrictEqual(['Inspecton Items\nTitle and Setting\nDelete\nArchive']);

  await page.waitForTimeout(3000);

  await page.getByText('Delete').click();

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Delete' }).click();

  await page.waitForTimeout(2000);

  await expect(page.getByText('Successfully deleted!')).toBeVisible();    

});