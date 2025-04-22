import { expect, test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-212__Verifies the issue displayed in the unit detail information page", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.issues);

  let issue_name = await page.getByRole("cell").nth(0).innerText();
  let issue_id = await page.getByRole("cell").nth(2).innerText();

  await page.goto(URLs.units);
  await page.locator(Selectors.search_input).fill(issue_name);

  expect(page.getByRole("cell").nth(0)).toBeVisible();
  await page.getByRole("cell").nth(0).click();
  await page.getByRole("tab", { name: "Issues" }).click();
  await page.waitForTimeout(5000);
  expect(page.getByRole("cell").nth(0)).toBeVisible();
  expect(page.getByText(issue_id)).toBeVisible();
});
