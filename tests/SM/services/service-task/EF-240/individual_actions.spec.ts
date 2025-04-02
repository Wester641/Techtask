import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, time, today } from "./Selectors";

const random = Math.floor(Math.random() * 3);
test("EF-240__Individual actions", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.serviceTask);

  await page.getByRole("cell").first().click();
  expect(page.locator(Selectors.actions_modal)).toBeVisible();
  await page.locator(Selectors.icon_button).nth(2).click();

  expect(
    page.locator(Selectors.create_service_task_form).first()
  ).toBeVisible();

  await page
    .locator(Selectors.input)
    .fill(`Template has been edited on ${today} at ${time}`);

  await page
    .locator(Selectors.description)
    .first()
    .fill(`Description has been edited on ${today} at ${time}`);

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(5000);

  expect(page.getByText("Service Task successfully updated!")).toBeVisible();
});
