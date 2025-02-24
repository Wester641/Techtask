import { test, expect } from "@playwright/test";

test("login test", async ({ page }) => {
  await page.goto("https://app.easyfleet.ai/login");

  await page.waitForSelector('input[type="text"]');

  await page.fill('input[type="text"]', "zafarzhon77@gmail.com");
  await page.fill('input[type="password"]', "zafarzhon77");

  await page.click('button[type="submit"]');

  // await page.waitForNavigation();

  await expect(
    page.locator(".VehicleDashboard_vehicle_dashboard__ZZkoI")
  ).toBeVisible();
});
