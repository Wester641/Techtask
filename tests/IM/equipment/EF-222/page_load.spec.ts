import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-222__Verify Equipment Page Loads Successfully", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForSelector(Selectors.addDataButton, { state: "visible" });

  expect(await page.locator(Selectors.addDataButton).count()).toBe(2);

  await expect(page.getByText("Add Equipment").first()).toBeVisible();
  await expect(page.getByText("Action").first()).toBeVisible();
  await expect(page.getByText("Equipment Status").first()).toBeVisible();
  await expect(page.getByText("Assigned Vehicle").first()).toBeVisible();

  await page.waitForSelector(Selectors.headerTable, { state: "visible" });

  const headers = await page.locator(Selectors.headerCell).allInnerTexts();
  const expectedHeaders = [
    "Status",
    "Name",
    "Type",
    "Brand",
    "Serial Number",
    "Current Assigned",
    "Linked Vehicle",
    "Action",
  ];

  expect(headers).toEqual(expect.arrayContaining(expectedHeaders));
});
