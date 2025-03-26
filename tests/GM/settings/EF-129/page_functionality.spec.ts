import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-129__Settings Page Functionality", async ({ page }) => {
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

  const count = await page.locator(Selectors.tabNavigation).count();

  for (let i = 0; i < count; i++) {
    await expect(page.locator(Selectors.tabNavigation).nth(i)).toBeVisible();
  }

});
