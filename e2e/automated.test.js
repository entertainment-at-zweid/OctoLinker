const fixtures = require('./fixtures.json'); // eslint-disable-line import/no-unresolved

async function executeTest(url, lineNumber, targetUrl) {
  const selector = `#LC${lineNumber} .octolinker-link`;

  await page.goto(url);

  await page.waitForSelector(selector);

  await Promise.all([
    page.waitForNavigation(),
    // page.click(selector), for some reason page.click is not working
    page.$eval(selector, el => el.click()),
  ]);

  await expect(page.url()).toEqual(expect.stringMatching(targetUrl));
}

describe('End to End tests', () => {
  fixtures.forEach(({ url, content, lineNumber, targetUrl }) => {
    it(`resolves ${content} to ${targetUrl}`, async () => {
      await executeTest(url, lineNumber, targetUrl);
    });
  });
});
