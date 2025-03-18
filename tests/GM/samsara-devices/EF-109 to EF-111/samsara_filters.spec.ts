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

test("EF-109__Verify Filtering by Vehicle", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.vehicleFilter).nth(1).click();

  await page.waitForSelector(Selectors.listVehicleFilter);

  const items = await page.locator(Selectors.listVehicleFilter).all();

  const randomItems = Math.random() * 3;

  await page.locator(Selectors.listVehicleFilter).nth(randomItems).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleFilter).nth(1).click();

  await page.locator(Selectors.resetVehicleFilter).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  // Add to expected failures
});

test("EF-111__Verify Filtering by Vehicle Group", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.widgetsFilter).nth(2).click();

  await page.waitForSelector(Selectors.listVehicleFilter);

  const items = await page.locator(Selectors.listVehicleFilter).all();

  const randomItems = Math.random() * 5;

  await page.locator(Selectors.listVehicleFilter).nth(randomItems).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  await page.waitForTimeout(3000);

  await page.locator(Selectors.widgetsFilter).nth(2).click();

  await page.locator(Selectors.resetVehicleFilter).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  // Add to expected failures
});

test("EF-110__Verify Filtering by Vehicle Status ", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.vehicleStatusFilter).first().click();

  await page
    .locator("div")
    .filter({ hasText: /^Out of Service$/ })
    .click();

  await page.getByRole("button", { name: "Apply" }).click();

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleStatusFilter).first().click();

  await page.getByTestId("ClearIcon").click();

  await page.getByRole("button", { name: "Apply" }).click();

  // Add to expected failures
});
