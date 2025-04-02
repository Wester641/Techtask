import { test, expect, Locator } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";
import exp from "constants";

test("EF-58__Fuel Entry Functionality", async ({ page }) => {
  await page.goto(URLs.fuelHistory);

  await page.locator(Selectors.add_fuel_entry_btn).click();

  await expect(page.getByRole("heading", { name: "Detail" })).toBeVisible();

  await page.locator(Selectors.vehicle_input).nth(0).click();
  const options = page.locator(Selectors.vehicle_option);
  await expect(options.first()).toBeVisible();
  await options.filter({ hasText: "Vehicle 17" }).first().click();
  await page.locator(Selectors.fuel_entry_date).fill("2025-03-28");
  await page.locator(Selectors.fuel_entry_time).fill("12:19");
  await page.locator(Selectors.vendor_name_input).nth(1).click();
  await expect(page.getByText("LOVES #965")).toBeVisible();
  await page.getByText("LOVES #965").click();
  await page.locator(Selectors.odometer_input).click();
  await page.locator(Selectors.odometer_input).fill("30000");
  await page.locator(Selectors.gallons_input).click();
  await page.locator(Selectors.gallons_input).fill("35");
  await page.locator(Selectors.gallon_price_input).click();
  await page.locator(Selectors.gallon_price_input).fill("4.52");
  await page.locator(Selectors.fuel_type_input).click();
  await page.locator(Selectors.fuel_type_input).fill("diesel");
  await page.locator(Selectors.submit_btn).scrollIntoViewIfNeeded();
  await page.locator(Selectors.submit_btn).click();
  await page.waitForTimeout(1000);
  await expect(page.locator(Selectors.toast_msg)).toBeVisible();
  await expect(page.getByText(/fuel history successfully/i)).toBeVisible();
});

test("EF-58__Fuel Entry Functionality_error message", async ({ page }) => {
  await page.goto(URLs.fuelHistory);
  await page.locator(Selectors.add_fuel_entry_btn).click();
  await expect(page.getByRole("heading", { name: "Detail" })).toBeVisible();

  //Future date for fuel entry
  // await page.locator(Selectors.vehicle_input).nth(0).click();
  // const options = page.locator(Selectors.vehicle_option);
  // await expect(options.first()).toBeVisible();
  // await options.filter({ hasText: "Vehicle 14" }).first().click();
  // await page.locator(Selectors.fuel_entry_date).fill("2025-08-20");

  //Error message
  await page.locator(Selectors.fuel_entry_date).fill("2025-03-25");
  await page.locator(Selectors.vendor_name_input).nth(1).click();
  await expect(page.getByText("LOVES #943")).toBeVisible();
  await page.getByText("LOVES #943").click();
  await page.locator(Selectors.submit_btn).scrollIntoViewIfNeeded();
  await page.locator(Selectors.submit_btn).click();
  await expect(page.locator(Selectors.error_msg).nth(1)).toBeVisible();
  await expect(page.locator(Selectors.error_msg).nth(1)).toHaveText(
    "Vehicle is required!"
  );
});
