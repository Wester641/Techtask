import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

// test.skip("EF-50__Samsara Devices Filters", async ({page}) => {
//     await page.goto(URLs.samsaraDevices);
//     const elements = await page.locator(Selectors.outputVehicleFilter);
//     const count = await elements.count();
//     console.log(await elements.count());
    
//     for (let i = 0; i < count; i++) {
//         console.log(await elements.nth(i).textContent())
//     }

//     await page
//         .locator(Selectors.vehicleFilter)
//         .nth(1)
//         .click();

//     await page
//         .waitForSelector(Selectors.listVehicleFilter);
    
//     const items = await page.locator(Selectors.listVehicleFilter).all();

//     const randomItems = items
//         .sort(() => Math.random() - 0.5)  // Mix
//         .slice(0, 1);

//     for (const item of randomItems) {
//         await item.click();
        
//         await page
//             .locator(Selectors.applyVehicleFilter)
//             .nth(1)
//             .click();
//         const elements = await page.locator(Selectors.outputVehicleFilter);
//         console.log(await elements.count());
//     }
        
// });


test("6__Samsara Devices Filters", async ({page}) => {
  await page.setViewportSize(screenSize);
    
    await page.goto(URLs.samsaraDevices);

    await page
        .locator(Selectors.vehicleFilter)
        .nth(1)
        .click();

    await page
        .waitForSelector(Selectors.listVehicleFilter);
    
    const items = await page.locator(Selectors.listVehicleFilter).all();

    const randomItems = items
        .sort(() => Math.random() - 0.5)  // Mix
        .slice(0, 4);

    for (const item of randomItems) {
        await item.click();
        
        await page
        .locator(Selectors.applyVehicleFilter)
        .nth(1)
        .click();

        const tableRow = await page.locator(Selectors.outputVehicleFilter).nth(3);
        await expect(await tableRow.count()).toBeGreaterThan(1);
        
        await page
            .locator(Selectors.vehicleFilter)
            .nth(1)
            .click();

        await page
            .locator(Selectors.resetVehicleFilter)
            .click();

        await page
            .locator(Selectors.applyVehicleFilter)
            .nth(1)
            .click();
        
        await expect(await tableRow.count()).toBeGreaterThan(10);

        await page
        .locator(Selectors.vehicleFilter)
        .nth(1)
        .click();
    }

});