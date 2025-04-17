import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-226__Verify List Fields Display", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

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
