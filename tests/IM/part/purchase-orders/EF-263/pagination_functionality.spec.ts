import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-263__verify pagination on purchase orders page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.purchaseOrders);

  await page.waitForSelector(Selectors.list_of_purchase_orders, {
    state: "visible",
    timeout: 10000,
  });

  // TODO: Add test if here is pagination buttons
});
