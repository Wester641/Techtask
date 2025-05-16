import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-280__verify that the import future is work correct", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.settingsButton).nth(1).click();

  await page.waitForTimeout(500);

  await page.locator(Selectors.importButton).first().click();

  await page.waitForTimeout(2000);

  expect(page.url()).toBe(
    "https://app.easyfleet.ai/import-files/?link=service_reminders"
  );

  expect(
    await page.locator(Selectors.importTypeField).first().innerText()
  ).toBe("Service Reminders");
});
