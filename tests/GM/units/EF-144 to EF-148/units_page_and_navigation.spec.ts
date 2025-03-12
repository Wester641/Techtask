import { expect, test } from "@playwright/test";
import { loginSelectors, Selectors, today } from "./Selectors";
import { URLs, Credentials } from "../../../../constants/links";
import {
  checkBlock,
  checkBlockBGtransparent,
} from "../../../../constants/styles";

const timeout = { timeout: 10000 };

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
  await page.waitForURL(URLs.units, timeout);
});

test("EF-144 and EF-145__Navigate to the Units page", async ({ page }) => {
  await page.goto(URLs.units);
  await page.waitForSelector(
    ".VehicleDiagrams_vehicle_diagrams__cards__8eFkt",
    timeout
  );

  await page.addStyleTag({
    content: checkBlock(".VehicleDiagrams_vehicle_diagrams__cards__8eFkt"),
  });
  await page.addStyleTag({
    content: checkBlockBGtransparent(
      ".VehicleDiagrams_vehicle_diagrams__cards__8eFkt"
    ),
  });

  await page.addStyleTag({
    content: checkBlock(".VehicleDiagrams_vehicle_diagrams__radar__g5P9V"),
  });

  await page.addStyleTag({
    content: checkBlockBGtransparent(
      ".VehicleDiagrams_vehicle_diagrams__radar__g5P9V"
    ),
  });

  await page.locator(Selectors.rowInTheTable).first().click();

  await page.waitForURL(/\/units\/[0-9a-fA-F-]+$/, timeout);

  const currentUrl = page.url();

  const unitId = currentUrl.match(/\/units\/([0-9a-fA-F-]+)$/)?.[1];

  await expect(page).toHaveURL(new RegExp(`/units/${unitId}($|\\?)`));
});

test("EF-146__Click on the first row in the table", async ({ page }) => {
  await page.locator(Selectors.rowInTheTable).first().click();

  await page.waitForURL(/\/units\/[0-9a-fA-F-]+$/, timeout);

  for (let i = 0; i < 7; i++) {
    await page.locator(Selectors.specsTabs).nth(i).click();
    await page.waitForTimeout(500);
  }

  for (let j = 6; j >= 0; j--) {
    await page.locator(Selectors.specsTabs).nth(j).click();
    await page.waitForTimeout(500);
  }
});

test("EF-147__Overview Tab", async ({ page }) => {
  const [apiResponse] = await Promise.all([
    page.waitForResponse((response) => {
      const url = response.url();
      return /https:\/\/app\.easyfleet\.ai\/api\/v1\/vehicles\/[0-9a-fA-F-]+\/$/.test(
        url
      );
    }),
    page.locator(Selectors.rowInTheTable).first().click(),
  ]);

  const vehicleData = await apiResponse.json();

  if (!vehicleData.name) {
    throw new Error("Vehicle name is missing in API response!");
  }

  await expect(page.locator(Selectors.vehicleName)).toHaveText(
    vehicleData.name
  );
});

test("EF-148__Verify the Comments section", async ({ page }) => {
  page.locator(Selectors.rowInTheTable).first().click(),
    await page.waitForTimeout(2500);
  await page.locator(Selectors.commentField).first().scrollIntoViewIfNeeded();
  page
    .locator(Selectors.commentField)
    .first()
    .fill(`Unit is working fine! Comment added on ${today}`);
  page.locator(Selectors.commentSaveButton).nth(0).click();
  await expect(page.locator(Selectors.successNotification)).toHaveText(
    "Comment is Added"
  );
});
