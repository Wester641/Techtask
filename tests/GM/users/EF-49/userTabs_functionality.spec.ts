import { test, expect } from "@playwright/test";
import { Selectors, loginSelectors } from "./Selectors";
import { URLs, Credentials } from "../../../../constants/links";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
  await page.waitForURL(URLs.units, { timeout: 30000 });
});

test("EF-49__User Tabs Functionality", async ({ page }) => {
  await expect(page.locator(Selectors.searchInput)).toBeVisible();
  await page.waitForTimeout(500);
  //Go to users page
  await expect(page.locator(Selectors.users).nth(1)).toBeVisible();
  await page.locator(Selectors.users).nth(1).click();

  await page.addStyleTag({
    content: `
      ${Selectors.usersSidebarPopup} {
        background-color: lightblue; 
        border: 1px solid #ccc;      
      }
    `,
  });

  await expect(page.locator(Selectors.selectUsersPopup).nth(0)).toBeVisible();
  await page.locator(Selectors.selectUsersPopup).nth(0).click();

  const tabs = await page.locator(Selectors.userTabs).elementHandles();
  for (let i = 0; i < tabs.length; i++) {
    if (i < tabs.length) {
      await page.addStyleTag({
        content: `
                ${Selectors.userTabs}:nth-of-type(${i + 1}) {
                    background-color: lightblue !important;
                    border: 1px solid #ccc !important;
                }`,
      });

      await page.waitForTimeout(100);

      // Remove styling
      await page.addStyleTag({
        content: `
        ${Selectors.userTabs}}:nth-of-type(${i + 1}) {
                    background-color: transparent !important;
                    border: none !important;
                }`,
      });
    }
  }
  await page.waitForTimeout(1000);

  //Go to Active tab
  await expect(page.locator(Selectors.activeTab).nth(1)).toBeVisible();
  await page.locator(Selectors.activeTab).nth(1).click();
  await expect(page).toHaveURL(/users\?page=1&status=active&tab=1/);

  //Go back to All tab
  await page.locator(Selectors.activeTab).nth(0).click();
  await expect(page).toHaveURL(/users\?page=1&status=&tab=0/);
  await page.waitForTimeout(1000);

  //Go to Invited tab
  await expect(page.locator(Selectors.activeTab).nth(2)).toBeVisible();
  await page.locator(Selectors.activeTab).nth(2).click();
  await expect(page).toHaveURL(/users\?page=1&status=invited&tab=2/);

  //Go to Archived tab
  await expect(page.locator(Selectors.activeTab).nth(3)).toBeVisible();
  await page.locator(Selectors.activeTab).nth(3).click();
  await expect(page).toHaveURL(/users\?page=1&status=archived&tab=3/);
});
