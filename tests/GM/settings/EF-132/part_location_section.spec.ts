import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-132__Part Location Section", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.settings);

  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(2).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.dataRow).nth(0)).toBeVisible();

  await expect(page.locator(Selectors.addButton)).toBeVisible();

  await page.locator(Selectors.addButton).click();

  await page.waitForTimeout(3000);
  
  await expect(page.locator(Selectors.createRoleModal)).toBeVisible();
  
  const inputFieldCount = await page.locator(Selectors.inputField).count();

  await expect(inputFieldCount).toBe(2);

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();

});
