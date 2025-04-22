import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";

test("EF-127__Verify Pagination Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto("/papers");

  const PAGE_PARAMETERS = "/papers?page=";

  const nextPageButton = page.getByRole("button", { name: "Go to next page" });
  const prevPageButton = page.getByRole("button", {
    name: "Go to previous page",
  });

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

  const per_page_button = page.getByRole("button", { name: "more" });

  await page.getByRole("listitem").nth(1).click();

  for (let i = 0; i < 3; i++) {
    await per_page_button.click();
    await page.getByRole("menuitem").nth(i).click();
  }
});
