import { test, expect } from '@playwright/test';

test('Should return most reading articles', async ({ request }) => {
  const getArticles = await request.get('https://habr.com/kek/v2/articles/most-reading?fl=en&hl=en');
  expect(getArticles.ok()).toBeTruthy();
});

test('Should replace all articles titels', async ({ page }) => {
  await page.route('**/articles/most-reading', async (route) => {
    const response = await route.fetch();
    let body = await response.text();
    const jsonBody = JSON.parse(body);
    Object.keys(jsonBody.articleRefs).forEach((key) => {
      if (jsonBody.articleRefs[key].titleHtml) {
        jsonBody.articleRefs[key].titleHtml = 'BlahBlahBlah';
      }
    });
    body = JSON.stringify(jsonBody);
    route.fulfill({
      response,
      body,
      headers: {
        ...response.headers(),
        'content-type': 'application/json',
      },
    });
  });

  await page.goto('https://habr.com/en/feed/');
});
