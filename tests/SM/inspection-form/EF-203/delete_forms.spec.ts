// import { test, expect } from "@playwright/test";
// import { Selectors } from "./Selectors";
// import { URLs, screenSize } from "../../../../constants/links";

// let createdFormTitle: string;

// test.only("EF-203__Delete Forms Functionality", async ({ page }) => {
//   await page.setViewportSize(screenSize);

//   await page.goto(URLs.inspectionForms);

//   await page.waitForTimeout(500);

//   await page.addStyleTag({
//     content: `
//       ${Selectors.settingsButton},
//       ${Selectors.cellTitle} {
//         background-color: #7d9ec087 !important; 
//         border: 1px solid #7d9ec087 !important;      
//       }`,
//   });

//   await page.waitForTimeout(500);

//   // Remove styling
//   await page.addStyleTag({
//     content: `
//       ${Selectors.settingsButton},
//       ${Selectors.cellTitle} {
//         background-color: transparent !important;
//         border: none !important;
//       }`,
//   });

//   await page.waitForTimeout(3000);

//   await expect(page.locator(Selectors.headerTable)).toBeVisible();

//   const headerText = await page.locator(Selectors.headerTable).allInnerTexts();

//   await expect(headerText).toStrictEqual(["TitleDescription	Item	Submissions"])






//   await page.waitForTimeout(1000);

//   const randomNum = Math.floor(Math.random() * 100);

//   const expectedText = `Test Form number: ${randomNum}`;
//   createdFormTitle = expectedText;

//   await page.locator(Selectors.titleField).fill(`Test Form number: ${randomNum}`);

//   await page.locator('textarea[name="description"]').fill(`Test Description number: ${randomNum}`);

//   await page.locator(Selectors.tickInput).nth(0).click();

//   await page.locator(Selectors.tickInput).nth(1).click();

//   await page.locator(Selectors.colorDropdown).first().click();

//   const allColors = await page.locator(Selectors.color).all();

//   await allColors[Math.floor(Math.random() * allColors.length)].click();

//   await page.getByText("Continue").click();

//   await page.waitForTimeout(3000);

//   await expect(page.locator(Selectors.dataBlock).first()).toBeVisible();

//   await page.locator(Selectors.dataBlock).first().click();

//   await page.waitForTimeout(3000);

//   await expect(page.locator(Selectors.dataBlock).first()).toBeVisible();

//   await page.locator(Selectors.titleField).nth(0).fill("Data Label Test");

//   await page.locator(Selectors.titleField).nth(1).fill("Label Test");

//   await page.locator('textarea[name="items\\.0\\.instructions"]').nth(0).fill("Test");

//   await page.getByText("Save").click();

//   await page.waitForTimeout(3000);
// });

// test("EF-201__Add Form Functionality - Verify Form", async ({ page }) => {
//   await page.setViewportSize(screenSize);

//   await page.goto(URLs.inspectionForms);

//   await page.waitForTimeout(500);

//   await page.locator(Selectors.managementTab).nth(1).click();

//   await page.waitForTimeout(1000);

//   await page.locator('div').filter({ hasText: /^Inspections$/ }).click();

//   await expect(page.locator(Selectors.selectDropdown)).toBeVisible();

//   await page.waitForTimeout(500);

//   await page.locator(Selectors.inspectionsTab).nth(1).click();

//   await page.waitForTimeout(3000);

//   await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

//   const expectedText = createdFormTitle;
//   if (!expectedText) {
//     throw new Error("Form title was not set by the first test.");
//   }

//   let found = false;

//   const amountOfPages = (await page.locator(".css-13zgp8s").count()) - 2;

//   for (let i = 0; i < amountOfPages; i++) {
//     for (let j = 0; j < 10; j++) {
//       const currentCell = page.locator(Selectors.cellTitle).nth(j);
//       const cellText = await currentCell.innerText();
//       console.log(`Cell ${j} text: ${cellText}`);

//       if (cellText.includes(expectedText)) {
//         found = true;
//         break;
//       }
//     }
//     if (found) break; 
//     await page.getByRole('button', { name: 'Go to next page' }).click();
//     await page.waitForTimeout(3000);
//   }

//   expect(found).toBe(true);
// });