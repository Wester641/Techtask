import { test as setup } from "@playwright/test";
import { Credentials, URLs } from "../constants/links";

setup("Login and save session", async ({ page }) => {
  await page.goto(URLs.login);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.getByRole("textbox", { name: "Email" }).fill(Credentials.email);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(Credentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(URLs.onboarding_form);
  await page.waitForURL(URLs.units);

  await page.context().storageState({ path: ".auth/login.json" });
});
