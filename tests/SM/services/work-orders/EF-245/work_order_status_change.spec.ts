import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

const random = Math.floor(Math.random() * 5);

test("EF-245__Work order status change functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.workOrders);

  await page.locator(Selectors.work_order).nth(random).click();

  await page
    .locator("button")
    .filter({ hasText: /Completed|Pending|In progress/ })
    .click();

  await page.waitForTimeout(1000);
  await expect(page.locator(Selectors.actions_modal)).toBeVisible();

  const statusPending = page.getByText("StatusPending");
  const statusOpen = page.getByText("StatusOpen");
  const statusCompleted = page.getByText("StatusCompleted");

  if (await statusCompleted.isVisible()) {
    console.log("Status is Completed. No changes allowed.");
    return;
  }

  if (await statusPending.isVisible()) {
    await page.getByRole("menuitem").nth(0).click();
    await page.getByText("StatusOpen").waitFor({ state: "visible" });
    await expect(page.getByText("Status successfully changed!")).toBeVisible();
  } else if (await statusOpen.isVisible()) {
    await page.getByRole("menuitem").nth(1).click();
    await page.getByText("StatusPending").waitFor({ state: "visible" });
  }
});
