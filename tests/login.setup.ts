import { test as setup } from "@playwright/test";
import { Credentials } from "../constants/links";

const Links = {
  login: "https://app.easyfleet.ai/login",
  onboarding_form: "https://app.easyfleet.ai/onboarding-form",
  units: "https://app.easyfleet.ai/units",
};

setup("Login and save session", async ({ page }) => {
  await page.goto(Links.login);

  await page.getByRole("textbox", { name: "Email" }).fill(Credentials.email);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(Credentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(Links.onboarding_form);
  await page.waitForURL(Links.units);

  await page.context().storageState({ path: ".auth/login.json" });
});
