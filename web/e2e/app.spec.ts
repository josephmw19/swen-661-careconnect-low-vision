import { test, expect } from "@playwright/test";

test("dashboard loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toContainText("CareConnect");
});

test("navigate to medications with shortcut", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+2");
  await expect(page.locator("body")).toContainText("Medications");
});

test("navigate to tasks with shortcut", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+3");
  await expect(page.locator("body")).toContainText("Tasks");
});