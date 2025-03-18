import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-47__Users Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.usersPage);

  await page.addStyleTag({
    content: `
    ${Selectors.usersRows},
    ${Selectors.usersNumber} {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });

  const numberOfUsers = await page.locator(Selectors.usersRows).count();

  const totalOfUsers = await page.locator(Selectors.usersNumber).innerText();

  await expect(parseInt(totalOfUsers)).toBe(numberOfUsers);

  for (let i = 0; i < 10; i++) {

    await page.locator(Selectors.usersRows).nth(i).waitFor({ state: "visible" });

    const userRow = page.locator(Selectors.usersRows).nth(i);

    const cells = userRow.locator("td");

    await expect(cells).toHaveCount(8);

  }
});