import { test, expect } from "@playwright/test";
import { screenSize } from "../../../../../constants/links";

test("EF-238__Tests page loading and UI elements", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/services/service-task");

  await page.waitForTimeout(3000);

  await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Description" })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Service Entries" })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Work Orders" })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Default Reason For Repair Code" })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Default System Code" })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Default Assembly Code" })
  ).toBeVisible();
});
