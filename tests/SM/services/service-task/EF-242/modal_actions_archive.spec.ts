import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, time, today } from "./Selectors";

const random = Math.floor(Math.random() * 3);

test("EF-242__Test functionality of the archiving service template and unarchive", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.serviceTask);

  await page.getByRole("cell").nth(0).click();
  // expect(page.locator(Selectors.actions_modal)).toBeVisible();
  await page.locator(Selectors.icon_button).nth(3).click();

  expect(page.getByText("Task successfully archived!")).toBeVisible();

  // unarchive
  await page.getByRole("tab", { name: "Archived" }).click();
  expect(page).toHaveURL("/services/service-task/?status=archived");
  await page.waitForTimeout(5000);
  await page.getByRole("cell").nth(0).click();
  // expect(page.locator(Selectors.actions_modal).nth(1)).toBeVisible();

  await page
    .locator(".DetailInfo_detail__header__icons__FORVB svg.css-mrqjss")
    .nth(1)
    .click();

  expect(page.getByText("Task successfully unarchived!")).toBeVisible();
  await page.getByRole("tab", { name: "Active" }).click();
});
