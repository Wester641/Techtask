import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test('EF-251__Verify Switch Tabs between statuses "Upcoming", "Due Soon" and "Overdue"', async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.contactRemindersPage);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabButton).nth(0).click();

  await page.waitForTimeout(1000);

  const upcomingRows = await page.locator(Selectors.dataRow).all();

  if (upcomingRows.length > 0) {
    for (const row of upcomingRows) {
      const status = await row.locator(Selectors.dataCell).nth(1).textContent();

      expect(status?.toLowerCase()).toContain("upcoming");
    }
  } else {
    console.log("NO ROWS IN THIS SECTION");
  }

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabButton).nth(1).click();

  await page.waitForTimeout(1000);

  const dueSoonRows = await page.locator(Selectors.dataRow).all();

  if (dueSoonRows.length > 0) {
    for (const row of dueSoonRows) {
      const status = await row.locator(Selectors.dataCell).nth(1).textContent();

      expect(status?.toLowerCase()).toContain("due soon");
    }
  } else {
    console.log("NO ROWS IN THIS SECTION");
  }

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabButton).nth(2).click();

  await page.waitForTimeout(1000);

  const overdueRows = await page.locator(Selectors.dataRow).all();

  if (overdueRows.length > 0) {
    for (const row of overdueRows) {
      const status = await row.locator(Selectors.dataCell).nth(1).textContent();

      expect(status?.toLowerCase()).toContain("overdue");
    }
  } else {
    console.log("NO ROWS IN THIS SECTION");
  }

  await page.waitForTimeout(3000);
});
