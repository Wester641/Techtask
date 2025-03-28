import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("Verify Pagination Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/papers");

  const PAGE_PARAMETERS = "https://app.easyfleet.ai/papers?page=";

  await page.getByRole("button", { name: "Go to next page" }).click();
  expect(page).toHaveURL(`${PAGE_PARAMETERS}2`);

  await page.getByRole("button", { name: "Go to next page" }).click();
  expect(page).toHaveURL(`${PAGE_PARAMETERS}3`);

  await page.getByRole("button", { name: "more" }).click();
  expect(page).toHaveURL(`${PAGE_PARAMETERS}1&limit=10`);

  await page.waitForSelector(Selectors.muiLisRoot);

  await page.getByRole("menuitem", { name: "20" }).click();
  expect(page).toHaveURL(`${PAGE_PARAMETERS}1&limit=20`);

  await page.getByRole("button", { name: "more" }).click();

  await page.getByRole("menuitem", { name: "50" }).click();
  expect(page).toHaveURL(`${PAGE_PARAMETERS}1&limit=50`);

  await page.getByRole("button", { name: "more" }).click();

  await page.getByRole("menuitem", { name: "10" }).click();
  expect(page).toHaveURL(`${PAGE_PARAMETERS}1&limit=10`);

  await page.getByRole("button", { name: "more" }).click();
});
