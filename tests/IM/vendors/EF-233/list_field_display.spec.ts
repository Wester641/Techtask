import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-233__verify list field display", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.vendorsPage + "?lat=41.88&lng=-87.63&radius=625");

  // TODO: Add test
  // the design was changed and the list field is not visible
});
