import { test, expect } from "@playwright/test";

test("test good fetching", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("URL 1").click();
  await page
    .getByPlaceholder("URL 1")
    .fill("https://api.tvmaze.com/singlesearch/shows?q=lost");
  await page.getByPlaceholder("URL 2").click();
  await page
    .getByPlaceholder("URL 2")
    .fill("https://api.tvmaze.com/singlesearch/shows?q=breaking bad");
  await page.getByPlaceholder("URL 3").click();
  await page
    .getByPlaceholder("URL 3")
    .fill("https://api.tvmaze.com/singlesearch/shows?q=game of thrones");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("heading", { name: "Lost" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Breaking Bad" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Game of Thrones" })
  ).toBeVisible();
});

test("test bad fetching", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("URL 1").click();
  await page.getByPlaceholder("URL 1").fill("fgsadsdfsdf");
  await page.getByPlaceholder("URL 2").click();
  await page
    .getByPlaceholder("URL 2")
    .fill("https://api.tvmaze.com/singlesearch/shows?q=lost");
  await page.getByPlaceholder("URL 3").click();
  await page.getByPlaceholder("URL 3").fill("sdfgdsfgdfg");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("heading", { name: "Lost" })).toBeVisible();
  await expect(
    page.getByText("Invalid URL - Failed to fetch metadata for URL 1")
  ).toBeVisible();
  await expect(
    page.getByText("Invalid URL - Failed to fetch metadata for URL 3")
  ).toBeVisible();
});

test("test reset button", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("URL 1").click();
  await page.getByPlaceholder("URL 1").fill("a");
  await page.getByPlaceholder("URL 2").click();
  await page.getByPlaceholder("URL 2").fill("b");
  await page.getByPlaceholder("URL 3").click();
  await page.getByPlaceholder("URL 3").fill("c");
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByPlaceholder("URL 1")).toBeVisible();
  await expect(page.getByPlaceholder("URL 2")).toBeVisible();
  await expect(page.getByPlaceholder("URL 3")).toBeVisible();
});

test("test add url button", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByPlaceholder("URL 4")).toBeVisible();
  await expect(page.getByPlaceholder("URL 5")).toBeVisible();
});

test("test remove url button", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "-" }).click();
  await page.getByRole("button", { name: "-" }).click();
  await expect(page.getByPlaceholder("URL 3")).toBeVisible();
});
