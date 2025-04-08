import { expect, test } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize } from "../../../../../constants/links";

test("EF-268__verify that the vehicle renewal page opens correctly", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto("/dashboard");

  await page
    .locator("div")
    .filter({ hasText: /^Service management$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Reminder$/ })
    .click();
  await page.getByText("Vehicle Renewal", { exact: true }).click();

  await expect(
    page.getByRole("columnheader", { name: "Status" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Vehicle", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Renewal Type" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Due Date" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Created On" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Vehicle Type" })
  ).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Year" })).toBeVisible();

  await expect(
    page.getByRole("textbox", { name: "Search" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Search" }).nth(1)
  ).toBeVisible();

  await expect(page.locator(Selectors.blockFiltering).first()).toBeVisible();
  await expect(page.locator(Selectors.modalOptions).first()).toBeVisible();
  await expect(page.locator(Selectors.addButton)).toBeVisible();
  await expect(
    page.getByRole("button", { name: "more" }).first()
  ).toBeVisible();
});
