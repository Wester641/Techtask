import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-100__Verify Search Functionality and UI", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.assigments);

  await page.addStyleTag({
      content: `
      ${Selectors.searchInput},
      ${Selectors.vehicleNameRow} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
    });
  
    await page.waitForTimeout(500);
  
    // Remove styling
    await page.addStyleTag({
      content: `
      ${Selectors.searchInput},
      ${Selectors.vehicleNameRow} {
        background-color: transparent !important;
        border: none !important;
      }`,
    });

    await page.waitForTimeout(10000);

    // Intercept API, get list of vehicles | Take a random vehicle from list of vehicles, and test it in UI

    const firstVehicleBefore = await page.locator(Selectors.vehicleNameRow).first().innerText();

    const allVehiclesBefore = await page.locator(Selectors.vehicleNameRow).allTextContents();

    const vehicleShortName = "GS";

    const vehicleFullName = "GS1044";

    await page.locator(Selectors.searchInput).click();

    await page.locator(Selectors.searchInput).fill(vehicleShortName);

    await page.waitForTimeout(3000);
      
    // Check results on containing vehicleShortName | Will be added after bug fix

    await page.locator(Selectors.searchInput).fill(vehicleFullName);

    await page.waitForTimeout(3000);
    
    await expect(page.locator(Selectors.vehicleNameRow).first()).toHaveText(vehicleFullName);
    
    await page.locator(Selectors.searchInput).fill("");

    await page.waitForTimeout(10000);

    const firstVehicleAfter = await page.locator(Selectors.vehicleNameRow).first().innerText();
      
    const allVehiclesAfter = await page.locator(Selectors.vehicleNameRow).allTextContents();

    console.log("Before:", allVehiclesBefore);
    console.log("After:", allVehiclesAfter);
    console.log("Before:", firstVehicleBefore);
    console.log("After:", firstVehicleAfter);

    await expect(allVehiclesBefore).toEqual(allVehiclesAfter);

    await expect(firstVehicleBefore).toBe(firstVehicleAfter);
    
});