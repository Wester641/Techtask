import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-250__Editing 'Contact Renewal Reminder' Functionality", async ({ page }) => {

  await page.setViewportSize(screenSize);

  await page.goto(URLs.contactRemindersPage);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.dataRow).first().click();

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.detailsModal).first()).toBeVisible();

  await page.locator(Selectors.settingsButton).nth(5).click();

  await page.waitForTimeout(2000);

  await page.locator(Selectors.selectButton).nth(0).click();

  await page.waitForTimeout(2000);

  const allContacts = await page.getByRole("option").all();

  const randomContact = allContacts[Math.floor(Math.random() * allContacts.length)];

  const randomContactText = await randomContact.innerText();

  await randomContact.click();

  await page.waitForTimeout(2000);

  const randomNum = Math.floor(Math.random() * 100)

  for (let i = 0; i < 2; i++) {
    await page.locator(".react-select__input").nth(1).fill(`Test: ${randomNum}`);

    await page.waitForTimeout(2000);
  
    await page.getByRole('option').first().click();
  
    await page.waitForTimeout(2000);
  }

  await page.locator(Selectors.selectButton).nth(2).click();

  await page.waitForTimeout(2000);

  const allThresholds = await page.getByRole("option").all();

  const randomThreshold = allThresholds[Math.floor(Math.random() * allThresholds.length)];

  await randomThreshold.click();

  await page.waitForTimeout(2000);

  await page.locator(Selectors.numberField).nth(1).fill(`${randomNum}`);

  await page.locator('textarea[name="description"]').fill(`Description test: ${randomNum}`);

  await page.getByText("Save").first().click();

  await page.waitForTimeout(2000);

  expect(page.getByText(randomContactText).first()).toBeVisible();

  // Add better check system !!!

});