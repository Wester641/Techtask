import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

const randomForm = Math.floor(Math.random() * 3);
test("EF-208__Passing inspection via web-application", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.locator(Selectors.startButton).first().click();

  await page.waitForTimeout(2000);

  await expect(page.locator(Selectors.selectModal).first()).toBeVisible();

  await page.getByRole("listitem").nth(randomForm).click();
  // const allForms = await page
  //   .locator(Selectors.selectFormDropdownElement)
  //   .all();

  // const targetFormName = "Test Form EF-208 #78456";

  // for (const form of allForms) {
  //   const formText = await form.innerText();

  //   if (formText === targetFormName) {
  //     await page.waitForTimeout(1000);
  //     await form.click();
  //     break;
  //   }
  // }

  await page.waitForTimeout(2000);

  // await expect(
  //   page.getByText("Choose vehicle to start inspection")
  // ).toBeVisible();

  // await page.locator(Selectors.selectVehicleInput).first().click();

  // await page.waitForTimeout(2000);

  // const allVehicles = await page.getByRole("option").all();

  // await allVehicles[Math.floor(Math.random() * allVehicles.length)].click();

  // await page.getByText("Save").click();

  // await page.waitForTimeout(2000);

  // await page.locator(Selectors.oneStringField).nth(0).click();

  // await page.keyboard.press("Enter");

  // await page.locator(Selectors.oneStringField).nth(1).click();

  // await page.keyboard.press("Enter");

  // await page.locator(Selectors.dropdownSelector).nth(1).click();

  // await page.keyboard.press("Enter");

  // await page.locator(Selectors.textField).first().fill("Test text 123");

  // await page.locator(Selectors.oneStringField).nth(2).fill("25");

  // const randomIndex = Math.floor(Math.random() * 3);

  // await page.locator(Selectors.tick).nth(randomIndex).click();

  // await page.locator(Selectors.oneStringField).nth(3).fill("Test sign");

  // await page.locator(Selectors.oneStringField).nth(1).click();

  // await page.getByText("Save").click();

  // await page.waitForTimeout(3000);

  // expect toast alert to be visible.
});
