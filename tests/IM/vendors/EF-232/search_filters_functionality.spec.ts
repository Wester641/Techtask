import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-232__verify search functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.vendorsPage + "?lat=41.88&lng=-87.63&radius=625");

  // TODO: Add assertions
  // the developers removed the search function from vendors page
});
