import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors, time, today } from "./Selectors";
const randomOption = Math.floor(Math.random() * 3);

test("EF-214__Solving issue with note", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/issues");
  // await page.getByRole("tab", { name: "Resolved" }).click();
  await page.getByRole("cell").nth(0).click();

  if (await page.getByText("Resolve", { exact: true }).isVisible()) {
    await page.getByText("Resolve", { exact: true }).click();
    await page.getByText("Resolve with Note").click();
    expect(page.locator(Selectors.resolve_modal)).toBeVisible();
    await page.getByRole("textbox").fill(`Test note ${today} at ${time}`);
    expect(page.getByText("Issue is resolved!")).toBeVisible();
    expect(page.getByText("Statusresolved")).toBeVisible();

    await page.getByRole("button", { name: "Resolve Issue" }).click();
  } else if (await page.getByText("Reopen", { exact: true }).isVisible()) {
    await page.waitForTimeout(5000);
    await page.getByText("Reopen").click();
    await page.getByRole("button", { name: "Reopen" }).click();
    await page.waitForTimeout(5000);
    expect(page.getByText("Issue is reopened")).toBeVisible();
    expect(page.getByText("Statusopen")).toBeVisible();
  }
});
