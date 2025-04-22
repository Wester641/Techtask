import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-237__Saving service history invoice functionality", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceHistory);

  const rows = page.getByRole("cell").nth(5);

  await rows.click();

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole("link").nth(4).click(),
  ]);
  expect(newPage).not.toBeNull();
  expect(newPage.url()).toContain("blob:");
});
