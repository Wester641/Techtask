import { expect, test } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-268__verify that the vehicle renewal page opens correctly", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Service management$/ })
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Reminder$/ })
    .click();
  await page.getByText("Vehicle Renewal", { exact: true }).click();

  const columnHeaders = [
    "Status",
    "Vehicle",
    "Renewal Type",
    "Due Date",
    "Created On",
    "Vehicle Type",
    "Year",
  ];

  for (let i = 0; i < columnHeaders.length; i++) {
    await expect(
      page.getByRole("columnheader", { name: columnHeaders[i], exact: true })
    ).toBeVisible();
  }

  const searchInputs = page.getByRole("textbox", { name: "Search" });
  for (let i = 0; i < 2; i++) {
    await expect(searchInputs.nth(i)).toBeVisible();
  }

  await expect(page.locator(Selectors.blockFiltering).first()).toBeVisible();
  await expect(page.locator(Selectors.modalOptions).first()).toBeVisible();
  await expect(page.locator(Selectors.addButton)).toBeVisible();
  await expect(
    page.getByRole("button", { name: "more" }).first()
  ).toBeVisible();
});
