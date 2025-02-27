import { test, expect } from "@playwright/test";
import { Selectors, time, loginSelectors } from "./Selectors";

import { URLs, Credentials } from "../../../constants/links";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
  await expect(page.locator(Selectors.unitContainer)).toBeVisible();
});

// CREATE USER

test("create user test", async ({ page }) => {
  await page.goto(URLs.users + "/create");

  await page
    .locator(Selectors.input)
    .nth(0)
    .fill(`User #${Math.floor(Math.random() * 10000).toFixed()} ${time}`);
  await page
    .locator(Selectors.input)
    .nth(3)
    .fill(`example${Math.floor(Math.random() * 1000)}@example.com`);

  await page.locator(Selectors.adminRole).nth(1).click();

  await page.click(Selectors.submitButton);
  await page.waitForSelector(Selectors.toastMessage, { state: "visible" });
});

// DELETE USER

// test("delete user test", async ({ page }) => {
//   await page.goto(URLs.users);
//   await page.locator(Selectors.threeDotsMenu).nth(2).click();
//   await page.locator(Selectors.deleteButton).nth(1).click();
//   await page.locator(Selectors.deleteConfirm).nth(1).click();
// });
