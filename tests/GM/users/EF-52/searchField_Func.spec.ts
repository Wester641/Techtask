import { test, expect } from "@playwright/test";
import { Selectors, loginSelectors } from "./Selectors";
import { URLs, Credentials } from "../../../../constants/links";
import { execPath } from "process";

test("EF-52_Search Field Functionality", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
  await page.waitForURL(URLs.units, { timeout: 30000 });
  await page.goto(URLs.users);

  await expect(page.locator(Selectors.searchInput).nth(0)).toBeVisible();
  await page.locator(Selectors.searchInput).nth(0).click();
  await page.locator(Selectors.searchInput).nth(0).fill("Bakyt");
  await page.locator(Selectors.searchInput).nth(0).clear();
  await page
    .locator(Selectors.searchInput)
    .nth(0)
    .fill("example105@example.com");
  await page.locator(Selectors.searchInput).nth(0).clear();
  await page.locator(Selectors.searchInput).nth(0).fill("Ben");
  await page.locator(Selectors.searchInput).nth(0).clear();
  await page.locator(Selectors.searchInput).nth(0).fill("xyz123");
});
