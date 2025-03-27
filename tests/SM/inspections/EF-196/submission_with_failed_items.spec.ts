import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-196__Submission with failed items", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_history);
  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("tab", { name: "Submission with Failed Items" }).click();
  expect(page).toHaveURL(URLs.inspection_history + "?page=1");

  for (let i = 0; i < 8; i++) {
    const columnHeader = await page.getByRole("columnheader").nth(i);

    await columnHeader.evaluate((element) => {
      element.style.backgroundColor = "#7d9ec087";
      element.style.border = "1px solid #7d9ec087";
    });

    await page.waitForTimeout(500);

    await columnHeader.evaluate((element) => {
      element.style.backgroundColor = "transparent";
      element.style.border = "none";
    });
  }

  const cellLocator = page.getByRole("cell").nth(7);

  if (cellLocator) {
    await expect(cellLocator).toBeVisible();

    const failedItems = await cellLocator.innerText();

    expect(cellLocator).toHaveText(failedItems);

    console.log(failedItems);
  }
});
// npx playwright test --grep "EF-196__Submission with failed items"
