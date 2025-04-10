import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-275__verify_that_the_service_reminders_page_opens_correctly", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.units);

  await page.getByText("Service management", { exact: true }).click();

  await page.getByText("Reminder", { exact: true }).click();

  await page.getByText("Service Reminders", { exact: true }).click();
});
