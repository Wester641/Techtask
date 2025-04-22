import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-281__tests the bulk-delete function is able to delete service reminder records", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);

  const apiResponse = await page.waitForResponse(
    (response) =>
      response
        .url()
        .includes(
          "https://app.easyfleet.ai/api/v1/reminders/service_reminders/?offset=0&limit=10"
        ) && response.status() === 200
  );

  const apiResponseData = await apiResponse.json();
  const count = apiResponseData.count - 6;

  await page.locator(Selectors.checkBox).first().click();

  const checkedCheckboxes = page.locator(Selectors.checkedCheckbox);
  const deleteButton = page.locator(Selectors.deleteButton);

  await page.waitForTimeout(500);

  for (let i = 1; i < count; i++) {
    expect(checkedCheckboxes.nth(i)).toHaveCount(1);
  }
  expect(deleteButton.nth(0)).toBeVisible();
});
