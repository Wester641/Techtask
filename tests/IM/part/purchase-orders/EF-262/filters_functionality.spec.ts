import { expect, test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-262__Verify Filters Functionality on Purchase Orders Page", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.purchaseOrders);

  await page.waitForSelector(Selectors.data_row, {
    state: "visible",
    timeout: 10000,
  });

  // PARTS FILTERS CHECK
  await page.locator(Selectors.filter_button).nth(0).click();

  const partValue = page.getByRole("cell").nth(4);

  await page
    .getByRole("textbox", { name: "Select Item(s)" })
    .fill(await partValue.innerText());
  await page.waitForTimeout(5000);

  await page.locator(Selectors.filter_option).first().click();
  await page.waitForTimeout(5000);

  await page.getByRole("button", { name: "Apply" }).click();

  expect(page.getByText(`${await partValue.innerText()}`)).toBeVisible();
  await page.waitForTimeout(5000);

  // Clear action
  await page.locator(Selectors.filter_button).nth(0).click();
  await page.getByTestId("ClearIcon").click();

  // VENDOR FILTERS CHECK
  await page.locator(Selectors.filter_button).nth(1).click();

  const vendorValue = page.getByRole("cell").nth(3);

  await page.locator(Selectors.filter_option).first().click();
  await page.waitForTimeout(5000);

  await page.getByRole("button", { name: "Apply" }).click();

  expect(
    page.getByText(`${await vendorValue.innerText()}`).first()
  ).toBeVisible();
  await page.waitForTimeout(5000);

  // Clear action
  await page.locator(Selectors.filter_button).nth(1).click();
  await page.getByTestId("ClearIcon").click();
});
