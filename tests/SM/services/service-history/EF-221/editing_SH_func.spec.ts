import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize } from "../../../../../constants/links";
const randomOption = Math.floor(Math.random() * 3);

test("EF-220__ service history functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/service-history");

  const rows = page.locator(Selectors.table_row);
  const count = await rows.count();

  if (count > 0) {
    const randomIndex = Math.floor(Math.random() * count);
    const randomRow = rows.nth(randomIndex);
    await expect(randomRow).toBeVisible();
    await randomRow.click();
  } else {
    console.log("No rows found to click.");
  }

  await page.locator(Selectors.icon_btn).click();

  const randomOption = Math.floor(Math.random() * 3);

  await page.locator(Selectors.select_container).first().click();
  await page.getByRole("option").nth(randomOption).click();
  await page.locator(Selectors.select_field2).click();
  await page.getByRole("option").nth(randomOption).click();
  await expect(page.locator(Selectors.modal_window)).toBeVisible();

  const vendors = page.locator(Selectors.vendors);
  const count_2 = await vendors.count();

  if (count_2 > 0) {
    const randomIndex = Math.floor(Math.random() * count_2);
    const randomVendor = vendors.nth(randomIndex);

    const selectedVendorName = await randomVendor.innerText();

    await randomVendor.scrollIntoViewIfNeeded();
    await expect(randomVendor).toBeVisible();
    await randomVendor.click();
    const vendorInput = page.locator(Selectors.vendor_input).nth(1);
    await expect(vendorInput).toHaveText(selectedVendorName);
  } else {
    console.log("No vendors found!");
  }

  await page.locator(Selectors.completion_date).fill("2025-04-08");
  await page.locator(Selectors.completion_time).fill("10:15");
  await page.locator(Selectors.start_date).fill("2025-04-07");
  await page.locator(Selectors.start_time).fill("14:15");
  await page.locator(Selectors.payment_type).last().click();
  await page.locator(".react-select__option", { hasText: "cash" }).click();
  await page.locator(Selectors.save_button).click();
  //   await page.waitForTimeout(1000);
  //   await expect(page.locator(Selectors.toast_msg)).toBeVisible();
  await page.waitForTimeout(1000);
  await expect(page.locator('tr:has-text("2025-04-08")').first()).toBeVisible();
});
