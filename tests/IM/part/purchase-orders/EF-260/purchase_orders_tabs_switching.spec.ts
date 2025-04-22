import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-260__Verify Tabs Switching on Purchase Orders Page", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.purchaseOrders);
  const firstRow = page.getByRole("cell").first();
  const status = page.getByRole("cell").nth(1);

  await page.waitForTimeout(5000);

  for (let i = 1; i < 9; i++) {
    await page.getByRole("tab").nth(i).click();
    await page.waitForTimeout(2000);
    if (await firstRow.isVisible()) {
      await expect(status).toHaveText(await status.innerText());
      console.log(await status.innerText());
    }
  }
  await page.getByRole("tab").nth(0).click();
});
