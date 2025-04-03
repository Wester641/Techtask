import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-205__Editing only 'Inspection Items' function", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await page.addStyleTag({
    content: `
      ${Selectors.headerTable} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.headerTable} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  await page.locator(Selectors.settingsButton).nth(2).click();

  await page.waitForTimeout(3000);
  
  const settingsNames = await page.locator(Selectors.settingsDropdown).first().allInnerTexts();

  await expect(settingsNames).toStrictEqual(['Inspecton Items\nTitle and Setting\nDelete\nArchive']);

  await page.waitForTimeout(3000);

  await page.getByRole('menuitem', { name: 'Inspecton Items' }).click();

  await page.waitForTimeout(2000);

  await expect(page.locator(Selectors.dataBlock).first()).toBeVisible();

  if (await page.locator(Selectors.dataBlock).count() == 1) {
    
    await page.locator(Selectors.dataBlock).first().click();

    await page.waitForTimeout(2000);
  }

  await page.locator(Selectors.titleField).nth(0).fill("Edited Data Label Test");

  await page.locator(Selectors.titleField).nth(1).fill("Edited Label Test");

  await page.locator('textarea[name="items\\.0\\.instructions"]').nth(0).fill("Edited Test");

  await page.getByText("Save").click();

  await page.waitForTimeout(3500);
  
  await expect(page.locator('[id="\\31 "]').getByText('Updated!')).toBeVisible();
  
});