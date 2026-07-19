const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[BROWSER PAGEERROR] ${err.toString()}`);
  });

  page.on('response', response => {
    const url = response.url();
    const contentType = response.headers()['content-type'];
    const status = response.status();
    if (url.includes('localhost:7788') && !url.includes('node_modules')) {
      console.log(`[RESPONSE] ${status} ${url} -> ${contentType}`);
    }
  });

  console.log('Navigating to http://localhost:7788...');
  try {
    await page.goto('http://localhost:7788', { waitUntil: 'load', timeout: 10000 });
  } catch (err) {
    console.error('Navigation error:', err.message);
  }

  console.log('Waiting for 5 seconds to capture all logs...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log('Browser closed.');
})();
