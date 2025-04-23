import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-127__Verify Pagination Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/papers");

  await page.waitForTimeout(3000);

  const PAGE_PARAMETERS = "/papers?page=";

  const nextPageButton = page.getByRole("button", { name: "Go to next page" });
  const prevPageButton = page.getByRole("button", { name: "Go to previous page" });

  if (!(await nextPageButton.isDisabled())) {
    await nextPageButton.click();
    await expect(page).toHaveURL(`${PAGE_PARAMETERS}2`);
  } else {
    console.log("Next page button is disabled, skipping click.");
  }

  if (!(await prevPageButton.isDisabled())) {
    await prevPageButton.click();
  } else {
    console.log("Previous page button is disabled, skipping click.");
  }

  await page.getByRole("listitem").nth(1).click();

  for (let i = 0; i < 3; i++) {
    await page.locator(Selectors.perPageButton).first().click();
    await page.getByRole("menuitem").nth(i).click();
  }
});
