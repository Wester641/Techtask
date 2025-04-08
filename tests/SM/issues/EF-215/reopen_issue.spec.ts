import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";

test("EF-215__Tests the 'Reopen' function on the 'issue' detail page.", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto("/issues");
  await page.getByRole("tab", { name: "Resolved" }).click();
  await page.getByRole("cell").nth(0).click();

  if (
    (await page.getByText("Reopen", { exact: true }).isVisible()) &&
    (await page.getByText("Statusresolved").isVisible())
  ) {
    await page.getByText("Reopen").click();
    await page.waitForTimeout(5000);
    await page.getByRole("button", { name: "Reopen" }).click();
    await page.waitForTimeout(5000);
    expect(page.getByText("Issue is reopened")).toBeVisible();
    expect(page.getByText("Statusopen")).toBeVisible();
  }
});
