import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
const require = createRequire('C:/Users/Pedram Sheikhrahimi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5186', '--strictPort'], { windowsHide: true });
await new Promise((resolve, reject) => {
  server.stdout.on('data', data => { if (data.toString().includes('Local:')) resolve(); });
  server.on('error', reject);
  server.on('exit', code => reject(new Error(`Vite exited: ${code}`)));
});
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:5186', { waitUntil: 'load' });
  await page.getByRole('button', { name: 'Open your invitation' }).click();
  await page.locator('.opening-film video').evaluate(video => video.dispatchEvent(new Event('ended')));
  await page.waitForTimeout(1600);
  await page.locator('.invitation-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  for (const width of [390, 320, 479]) {
    await page.setViewportSize({ width, height: 844 });
    const result = await page.locator('img[src$="footer-couple.jpg"]').evaluate(img => ({
      loaded: img.complete && img.naturalWidth > 0,
      width: img.naturalWidth,
      height: img.naturalHeight,
      renderedWidth: img.getBoundingClientRect().width,
      renderedHeight: img.getBoundingClientRect().height,
    }));
    if (!result.loaded || Math.abs(result.renderedWidth / result.renderedHeight - result.width / result.height) > 0.001) throw new Error(JSON.stringify(result));
    console.log(JSON.stringify({ viewport: width, ...result }));
    if (width === 390) await page.locator('.invitation-footer').screenshot({ path: '.preview/footer-couple-mobile.png' });
  }
  if (errors.length) throw new Error(errors.join('\n'));
} finally {
  await browser?.close();
  server.kill();
}
