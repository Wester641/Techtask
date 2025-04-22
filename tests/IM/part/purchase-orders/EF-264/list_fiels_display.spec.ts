import { expect, test } from "@playwright/test";
import { BASE_URL, screenSize, URLs } from "../../../../../constants/links";
import { headers, Selectors } from "./Selectors";

test("EF-264__verify list fields display for purchase orders", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(BASE_URL + URLs.purchaseOrders);

  await page.waitForSelector(Selectors.list_of_purchase_orders, {
    state: "visible",
    timeout: 10000,
  });

  expect(page.getByRole("columnheader", { name: headers[0] })).toBeVisible();
  await page.waitForTimeout(3000);
});
