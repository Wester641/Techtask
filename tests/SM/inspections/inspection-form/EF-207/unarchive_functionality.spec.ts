import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-207__Unarchive Forms Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await page.addStyleTag({
    content: `
      ${Selectors.tabButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.tabButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabButton).nth(1).click();

  await page.waitForTimeout(1000);

  await expect(page.url()).toBe("https://app.easyfleet.ai/inspections/forms?status=archived");

  const unarchivedRow = await page.getByRole('row').locator(Selectors.dataCell).nth(0).innerText();

  console.log(unarchivedRow)

  await page.getByRole('row').getByLabel('more').nth(0).click();

  await page.waitForTimeout(3000);
  
  const settingsNames = await page.locator(Selectors.settingsDropdown).first().allInnerTexts();

  await expect(settingsNames).toStrictEqual(['Inspecton Items\nTitle and Setting\nDelete\nUnarchive']);

  await page.waitForTimeout(3000);

  await page.getByRole('menuitem', { name: 'Unarchive' }).click();

  await page.waitForTimeout(2000);

  await expect(page.locator('[id="\\31 "]').getByText('Unarchived')).toBeVisible();

  await page.locator(Selectors.tabButton).nth(0).click();

  await page.waitForTimeout(1000);

  await expect(page.url()).toBe("https://app.easyfleet.ai/inspections/forms?status=active");

  let found = false;

  const amountOfPages = (await page.locator(Selectors.pageButton).count()) - 2;

  for (let i = 0; i < amountOfPages; i++) {
    for (let j = 0; j < 10; j++) {
      const currentCell = page.locator(Selectors.dataCell).nth(j);
      const cellText = await currentCell.innerText();
      console.log(cellText)

      if (cellText.includes(unarchivedRow)) {
        found = true;
        break;
      }
    }
    if (found) break; 
    await page.getByRole('button', { name: 'Go to next page' }).click();
    await page.waitForTimeout(3000);
  }
});