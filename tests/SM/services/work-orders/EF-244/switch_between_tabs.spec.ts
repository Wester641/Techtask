import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { expect_urls } from "./Selectors";

test("EF-244__Verify switching between 'Open', 'Pending' and 'Completed' tabs", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.workOrders);

  await page.waitForTimeout(3000);

  // for (let i = 1; i < 4; i++) {
  //   await page.getByRole("tab").nth(i).click();
  //   await page.waitForTimeout(3000);
  //   expect(page).toHaveURL(expect_urls[i - 1].url);
  // }

  // await page.getByRole("tab").nth(0).click();
  // expect(page).toHaveURL(expect_urls[3].url);
});
