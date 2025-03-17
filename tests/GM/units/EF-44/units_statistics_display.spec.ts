import { test, expect } from "@playwright/test";
import { Selectors, loginSelectors, time } from "./Selectors";

import { URLs, Credentials } from "../../../../constants/links";

test("EF-44__Units Statistics Display", async ({ page }) => {
  await page.goto(URLs.units);
  await page.addStyleTag({
    content: `
    ${Selectors.unitsDownTime}:nth-child(1) {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });

  await page.waitForTimeout(2000);

  await page.addStyleTag({
    content: `
    ${Selectors.unitsDownTime}:nth-child(2) {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });
  await page.waitForTimeout(2000);

  await page.addStyleTag({
    content: `
    ${Selectors.unitsCanvasSpider}{
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });
  await page.waitForTimeout(2000);
});
