import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-47__Users Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.users);

  await page.getByRole("tab", { name: "All" }).click();

  await expect(page.locator(Selectors.usersNumber)).toBeVisible();

  for (let i = 0; i < 10; i++) {
    const userRow = page.locator(Selectors.usersRows).nth(i);

    await userRow.waitFor({ state: "visible" });

    const cells = userRow.locator("td");

    await expect(cells).toHaveCount(8);
  }
});
