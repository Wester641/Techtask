import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-248__Navigate to the 'contact renewal' reminder page", async ({ page }) => {

  await page.setViewportSize(screenSize);

  await page.goto(URLs.dashboard);

  await page.waitForTimeout(3000);

  await page.getByText("Service management").first().click();

  await page.waitForTimeout(500);

  await page.getByText("Reminder").first().click();

  await page.waitForTimeout(500);

  await page.getByText("Contact Renewal").first().click();

  await page.waitForTimeout(3000);

  expect(await page.locator(Selectors.headerRow).first().innerText()).toContain("Status	User	Renewal Type	Due Date	Created On	User role");
});
