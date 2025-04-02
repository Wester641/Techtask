import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, time, today } from "./Selectors";

const random = Math.floor(Math.random() * 3);

test("EF-240__Individual Service Template Actions", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.serviceTask);

  await page.getByRole("cell").nth(7).click();
  expect(page.locator(Selectors.three_dot_menu)).toBeVisible();
  await page.getByRole("menuitem").nth(1).click();

  // EDIT
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

  // ARCHIVE

  // await page.getByRole("cell").nth(7).click();
  // await page.getByRole("menuitem").nth(2).click();
  // expect(page.getByText("Task successfully archived!")).toBeVisible();

  // DELETE;

  // await page.getByRole("cell").nth(7).click();
  // expect(page.locator(Selectors.confirm_delete_modal)).toBeVisible();
  // await page.getByRole("menuitem").nth(0).click();
  // await page.getByRole("button").nth(1).click();
});
