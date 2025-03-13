import { test, expect } from "@playwright/test";
import { Selectors, loginSelectors, time } from "./Selectors";

import { URLs, Credentials } from "../../../../constants/links";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
    await page.waitForURL(URLs.units, { timeout: 10000 });
});

test("EF-41__Sidebar Navigation", async ({ page }) => {
  await expect(page.locator(Selectors.unitContainer)).toBeVisible();

  await page.addStyleTag({
    content: `
    ${Selectors.unitContainer} {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });
});
