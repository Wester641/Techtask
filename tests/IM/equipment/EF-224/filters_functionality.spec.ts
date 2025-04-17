import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-224__Verify Filters Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForTimeout(3000);

  const allBefore = await page.locator(Selectors.dataRow).allInnerTexts();


  await page.getByText("Action").first().click();
  await page.waitForTimeout(2000);

  const allActions = await page.locator(Selectors.dropdownOption).all();
  const randomAction = allActions[Math.floor(Math.random() * allActions.length)];
  const randomActionName = await randomAction.innerText();
  await randomAction.click();

  await page.getByText("Apply").click();
  await page.waitForTimeout(2000);

  const dataAmountAction = await page.locator(Selectors.dataRow).count();

  if (dataAmountAction > 0) {
    for (let i = 0; i < dataAmountAction; i++) {
      const currentRow = page.locator(Selectors.dataRow).nth(i);

      const type = await currentRow.locator("td").nth(7).innerText();
      expect(type).not.toBe(randomActionName);
    }
  }

  await page.locator(Selectors.resetButton).first().click();


  await page.getByText("Equipment Status").first().click();
  await page.waitForTimeout(2000);

  const allStatuses = await page.locator(Selectors.dropdownOption).all();
  const randomStatus = allStatuses[Math.floor(Math.random() * allStatuses.length)];
  const randomStatusName = await randomStatus.innerText();
  await randomStatus.click();

  await page.getByText("Apply").click();
  await page.waitForTimeout(2000);

  const dataAmountStatus = await page.locator(Selectors.dataRow).count();

  if (dataAmountStatus > 0) {
    for (let i = 0; i < dataAmountStatus; i++) {
      const currentRow = page.locator(Selectors.dataRow).nth(i);

      const type = await currentRow.locator("td").nth(0).innerText();
      expect(type).toBe(randomStatusName);
    }
  }

  await page.locator(Selectors.resetButton).first().click();


  await page.getByText("Assigned Vehicle").first().click();
  await page.waitForTimeout(2000);

  const allVehicles = await page.locator(Selectors.dropdownVehicleOption).all();
  const randomVehicle = allVehicles[Math.floor(Math.random() * allVehicles.length)];
  const randomVehicleName = await randomVehicle.innerText();
  await randomVehicle.click();

  await page.getByText("Apply").click();
  await page.waitForTimeout(2000);

  const dataAmountVehicle = await page.locator(Selectors.dataRow).count();

  if (dataAmountVehicle > 0) {
    for (let i = 0; i < dataAmountVehicle; i++) {
      const currentRow = page.locator(Selectors.dataRow).nth(i);

      const type = await currentRow.locator("td").nth(6).innerText();
      expect(type).toBe(randomVehicleName);
    }
  }

  await page.locator(Selectors.resetButton).first().click();
  await page.waitForTimeout(2000);
  
  const allAfter = await page.locator(Selectors.dataRow).allInnerTexts();
  expect(allBefore).toEqual(allAfter);
});