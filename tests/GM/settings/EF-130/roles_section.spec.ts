import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-130__Roles Section", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.settings);

  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(0).click();

  await page.waitForTimeout(3000);

  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.settingsButton},
      ${Selectors.infoBlock},
      ${Selectors.dataResult},
      ${Selectors.addButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.settingsButton},
      ${Selectors.infoBlock},
      ${Selectors.dataResult},
      ${Selectors.addButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await expect(page.locator(Selectors.searchInput)).toBeVisible();

  if (await page.locator(Selectors.dataResult).count() == 0) {
    await expect(page.locator(Selectors.infoBlock).nth(0)).toContainText("No records found");
  }

  await expect(page.locator(Selectors.settingsButton).nth(0)).toBeVisible();

  await expect(page.locator(Selectors.settingsButton).nth(1)).toBeVisible();

  await expect(page.locator(Selectors.addButton).nth(0)).toBeVisible();

  await page.locator(Selectors.addButton).nth(0).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.createRoleModal)).toBeVisible();

  const inputFieldCount = await page.locator(Selectors.inputField).count();
  const tickHeaderCount = await page.locator(Selectors.tickHeader).count();
  const tickRowCount = await page.locator(Selectors.tickRow).count();

  await expect(inputFieldCount).toBe(2);
  await expect(tickHeaderCount).toBe(1);
  await expect(tickRowCount).toBe(29);

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();

  const num = await Math.floor(Math.random() * 100);

  await page.locator('input[name="name"]').fill(`Role number: ${num}`);

  for (let i = 0; i < 29; i++) {
    const currentTickRow = page.locator(Selectors.permSelect).nth(i)

    const checkboxes = currentTickRow.locator('label span .css-1m9pwf3');
    const randomIndex = Math.floor(Math.random() * 3);

    await checkboxes.nth(randomIndex).check();
  }

  await page.getByRole('button', { name: 'Save' }).click(); 

  await page.waitForTimeout(3000);

  const countOfDataResults = await page.locator(Selectors.dataResult).count();

  let found = false;

  for (let i = 0; i < countOfDataResults; i++) {
    const currentDataResult = await page.locator(Selectors.dataResult).nth(i);
    const text = await currentDataResult.innerText();

    if (text.includes(`Role number: ${num}`)) {
      found = true;
      break;
    }
  
  }

  expect(found).toBe(true);
});