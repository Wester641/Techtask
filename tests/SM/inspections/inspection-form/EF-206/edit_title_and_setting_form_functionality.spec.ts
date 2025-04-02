import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-206__Editing only 'Title and Setting' form, function", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await page.addStyleTag({
    content: `
      ${Selectors.headerTable} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.headerTable} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  await page.locator(Selectors.settingsButton).nth(2).click();

  await page.waitForTimeout(3000);
  
  const settingsNames = await page.locator(Selectors.settingsDropdown).first().allInnerTexts();

  await expect(settingsNames).toStrictEqual(['Inspecton Items\nTitle and Setting\nDelete\nArchive']);

  await page.waitForTimeout(3000);

  await page.getByRole('menuitem', { name: 'Title and Setting' }).click();

  await page.waitForTimeout(2000);

  const randomNum = Math.floor(Math.random() * 100);
  const expectedText = `Edited Test Form number: ${randomNum}`;

  await page.locator(Selectors.titleField).fill(`Edited Test Form number: ${randomNum}`);

  await page.locator('textarea[name="description"]').fill(`Edited Test Description number: ${randomNum}`);

  await page.locator(Selectors.tickInput).nth(0).click();

  await page.locator(Selectors.tickInput).nth(1).click();

  await page.locator(Selectors.colorDropdown).first().click();

  const allColors = await page.locator(Selectors.color).all();

  await allColors[Math.floor(Math.random() * allColors.length)].click();

  await page.getByText("Save").click();

  await page.waitForTimeout(3000);
  
  await expect(page.locator('[id="\\31 "]').getByText('Inspection form successfully updated!')).toBeVisible();
  
  let found = false;

  const amountOfPages = (await page.locator(Selectors.pageButton).count()) - 2;

  for (let i = 0; i < amountOfPages; i++) {
    for (let j = 0; j < 10; j++) {
      const currentCell = page.locator(Selectors.cellTitle).nth(j);
      const cellText = await currentCell.innerText();

      if (cellText.includes(expectedText)) {
        found = true;
        break;
      }
    }
    if (found) break; 
    await page.getByRole('button', { name: 'Go to next page' }).click();
    await page.waitForTimeout(3000);
  }

  expect(found).toBe(true);

});