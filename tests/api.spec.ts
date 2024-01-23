import { test, expect } from '@playwright/test';

let articleIds: string[] = ['783038', '431444', '572926', '575632', '752818', '785866', '784178', '591171', '764692', '720422'];

test.beforeAll(async ({ request }) => {
  const response = await request.get('https://habr.com/kek/v2/articles/most-reading?fl=en&hl=en');
  const jsonBody = await response.json();
  articleIds = jsonBody.articleIds;
});

test('Should return most reading articles', async ({ request }) => {
  const getArticles = await request.get('https://habr.com/kek/v2/articles/most-reading?fl=en&hl=en');
  expect(getArticles.ok()).toBeTruthy();
});

test('Should replace all articles titels', async ({ page }) => {
  await page.route('*/**/articles/most-reading*', async (route) => {
    const response = await route.fetch();
    const jsonBody = await response.json();
    Object.keys(jsonBody.articleRefs).forEach((key) => {
      if (jsonBody.articleRefs[key].titleHtml) {
        jsonBody.articleRefs[key].titleHtml = 'BlahBlahBlah';
      }
    });
    const body = JSON.stringify(jsonBody);
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

  const newHeaders = await page.locator('.tm-article-title__link span').all();
  // eslint-disable-next-line no-restricted-syntax
  for (const element of newHeaders) {
    const text = await element.innerText();
    expect(text).toEqual('BlahBlahBlah');
  }
});

articleIds.forEach((id) => {
  test(`Article should contain description for ID ${id}`, async ({ request }) => {
    const response = await request.get(`https://habr.com/kek/v2/articles/${id}/?fl=en&hl=en`);
    expect(response.ok()).toBeTruthy();
    const responseJson = await response.json();
    expect(responseJson.leadData).toBeDefined();
    expect(responseJson.leadData.textHtml).toBeTruthy();
  });
});
