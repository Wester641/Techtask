import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-235__verify pagination functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.vendorsPage + "?lat=41.88&lng=-87.63&radius=625");

  // TODO: Add test
  // the design was changed and the pagination is not working as expected
});
