import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-47__Users Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.usersPage);

  // Add styling
  await page.addStyleTag({
    content: `
    ${Selectors.usersRows},
    ${Selectors.usersNumber} {
      background-color: #7d9ec087 !important; 
      border: 1px solid #7d9ec087 !important;      
    }`,
  });

  await page.waitForTimeout(100);

  // Remove styling
  await page.addStyleTag({
    content: `
    ${Selectors.usersRows},
    ${Selectors.usersNumber} {
      background-color: transparent !important;
      border: none !important;
    }`,
  });

  await page.waitForTimeout(100);

  await expect(page.locator(Selectors.usersNumber)).toBeVisible();

  const totalOfUsers = await page.locator(Selectors.usersNumber).innerText();

  const totalUsersCount = parseInt(totalOfUsers.replace(/\D/g, ""), 10);

  const numberOfUsers = await page.locator(Selectors.usersRows).count();

  for (let i = 0; i < 10; i++) {
    const userRow = page.locator(Selectors.usersRows).nth(i);

    await userRow.waitFor({ state: "visible" });

    const cells = userRow.locator("td");

    await expect(cells).toHaveCount(8);
  }
});