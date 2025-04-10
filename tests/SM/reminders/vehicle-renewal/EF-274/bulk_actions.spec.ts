import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-274__tests the bulk-delete function is able to delete contact renewal records", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.vehicleRemindersPage);

  const apiResponse = await page.waitForResponse(
    (response) =>
      response
        .url()
        .includes(
          "https://app.easyfleet.ai/api/v1/reminders/vehicle_renewal_type/"
        ) && response.status() === 200
  );

  const apiResponseData = await apiResponse.json();
  const count = apiResponseData.count;

  await page.locator(Selectors.checkBox).first().click();

  const checkedCheckboxes = page.locator(Selectors.checkedCheckbox);

  await page.waitForTimeout(500);

  for (let i = 1; i < count; i++) {
    expect(checkedCheckboxes.nth(i)).toHaveCount(1);
  }
});
