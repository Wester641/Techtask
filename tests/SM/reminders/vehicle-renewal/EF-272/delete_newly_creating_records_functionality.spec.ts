import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-272__delete newly creating records functionality", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.vehicleRemindersPage);

  await page.getByRole("cell").nth(1).click();

  await page.locator(Selectors.header_icons).first().click();
  await page.getByRole("button", { name: "Delete" }).click();
});
