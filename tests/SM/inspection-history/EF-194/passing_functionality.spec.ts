import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-194__Passing inspection functionality", async ({ page }) => {
  // await page.setViewportSize(screenSize);

  // await page.goto(URLs.inspectionHistory);

  // await page.waitForTimeout(500);

  // await page.addStyleTag({
  //   content: `
  //     ${Selectors.startButton} {
  //       background-color: #7d9ec087 !important; 
  //       border: 1px solid #7d9ec087 !important;      
  //     }`,
  // });

  // await page.waitForTimeout(500);

  // // Remove styling
  // await page.addStyleTag({
  //   content: `
  //     ${Selectors.startButton} {
  //       background-color: transparent !important;
  //       border: none !important;
  //     }`,
  // });

  // await page.waitForTimeout(3000);

  // await page.locator(Selectors.startButton).first().click();

  // await page.waitForTimeout(1000);

  // await expect(page.locator(Selectors.selectModal).first()).toBeVisible();

  // const formList = await page.locator(Selectors.selectForm).all();

  // const randomForm = formList[Math.floor(Math.random() * formList.length)];

  // await randomForm.click(); 

  // await page.waitForTimeout(1000);

  // await expect(page.getByText('Choose vehicle to start inspectionSelect...CancelSave')).toBeVisible();

  // await page.locator(Selectors.selectVehicleField).first().click();

  // const vehicleList = await page.locator(Selectors.vehicle).all();

  // const randomVehicle = vehicleList[Math.floor(Math.random() * vehicleList.length)];

  // await randomVehicle.click(); 

  // await page.getByText("Save").click();

  // await page.waitForTimeout(5000);

  // await expect(page.locator(Selectors.inspectionDetailsTable).first()).toBeVisible();

  // const randomNum = Math.floor(Math.random() * 100);

  // const today = new Date();

  // const formattedDate = today.toLocaleDateString('ru-RU', {
  // day: '2-digit',
  // month: '2-digit',
  // year: 'numeric',
  // });

  // await page.locator('input[name="start_datetime"]').fill(formattedDate);

  // await page.waitForTimeout(1000);

  // await page.locator('input[name="start_time"]').fill("1200");

  // await page.waitForTimeout(1000);

});