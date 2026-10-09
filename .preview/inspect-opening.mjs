import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
const require = createRequire('C:/Users/Pedram Sheikhrahimi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5187', '--strictPort'], { windowsHide: true });
await new Promise((resolve, reject) => {
  server.stdout.on('data', data => { if (data.toString().includes('Local:')) resolve(); });
  server.on('error', reject);
  server.on('exit', code => reject(new Error(`Vite exited: ${code}`)));
});
let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5187', { waitUntil: 'load' });
  const result = await page.evaluate(async () => {
    const video = document.querySelector('.opening-film video');
    if (video.readyState < 2) await new Promise((resolve, reject) => {
      video.addEventListener('loadeddata', resolve, { once: true });
      video.addEventListener('error', () => reject(new Error(`Video error ${video.error?.code}`)), { once: true });
    });
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return { width: canvas.width, height: canvas.height, duration: video.duration, time: video.currentTime, poster: canvas.toDataURL('image/png') };
  });
  await writeFile('public/assets/opening-poster.png', Buffer.from(result.poster.split(',')[1], 'base64'));
  const { poster, ...metadata } = result;
  console.log(JSON.stringify(metadata));
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 720 }]) {
    await page.setViewportSize(viewport);
    await page.reload({ waitUntil: 'load' });
    const button = page.getByRole('button', { name: 'Open your invitation' });
    await button.waitFor({ state: 'visible' });
    const before = await page.locator('.opening-film video').evaluate(video => ({ paused: video.paused, time: video.currentTime }));
    if (!before.paused || before.time !== 0) throw new Error('Video started before a tap');
    const posterState = await button.locator('img').evaluate(img => ({ loaded: img.complete && img.naturalWidth === 576, bottom: img.getBoundingClientRect().bottom, top: img.getBoundingClientRect().top }));
    if (!posterState.loaded || posterState.top < 0 || posterState.bottom > viewport.height + 1) throw new Error(`Poster not fully visible: ${JSON.stringify(posterState)}`);
    if (viewport.width === 390) await page.screenshot({ path: '.preview/opening-poster-mobile.png' });
    await page.locator('.opening-film video').evaluate(video => {
      window.openingEvents = [];
      for (const event of ['playing', 'ended', 'error']) video.addEventListener(event, () => window.openingEvents.push({ event, time: video.currentTime }));
    });
    await button.click();
    await page.waitForFunction(() => window.openingEvents.some(entry => entry.event === 'playing'));
    if (viewport.width === 390) {
      await page.waitForTimeout(800);
      await page.screenshot({ path: '.preview/opening-playing-mobile.png' });
    }
    await page.locator('.film-fading').waitFor({ state: 'attached', timeout: 10000 });
    const ending = await page.locator('.opening-film video').evaluate(video => ({ ended: video.ended, time: video.currentTime, duration: video.duration, events: window.openingEvents }));
    if (!ending.ended || ending.events.some(entry => entry.event === 'error')) throw new Error(`Video did not finish: ${JSON.stringify(ending)}`);
    await page.locator('.opening-film').waitFor({ state: 'detached', timeout: 4000 });
    await page.locator('.music-toggle').waitFor({ state: 'visible' });
    await page.locator('.invitation').waitFor({ state: 'visible' });
    console.log(JSON.stringify(await page.locator('audio').evaluate(audio => ({ src: audio.currentSrc, duration: audio.duration, time: audio.currentTime, paused: audio.paused, state: audio.readyState, network: audio.networkState, error: audio.error?.message }))));
    await page.waitForFunction(() => {
      const audio = document.querySelector('audio');
      return !audio.paused && audio.currentTime > 0 && audio.readyState >= 2;
    });
    const music = await page.locator('audio').evaluate(audio => ({ src: audio.currentSrc, duration: audio.duration, time: audio.currentTime, loop: audio.loop, error: audio.error?.code }));
    if (!music.src.endsWith('/assets/music.mp3') || !music.loop || music.error) throw new Error(`Music failed: ${JSON.stringify(music)}`);
    await page.getByRole('button', { name: 'Pause music' }).click();
    await page.waitForFunction(() => document.querySelector('audio').paused);
    await page.getByRole('button', { name: 'Play music' }).click();
    await page.waitForFunction(() => !document.querySelector('audio').paused && document.querySelector('audio').currentTime > 0);
    console.log(JSON.stringify({ music, pauseAndResume: true }));
    if (viewport.width === 390) await page.screenshot({ path: '.preview/opening-finished-mobile.png' });
    console.log(JSON.stringify({ viewport, before, posterState, ending, invitationVisible: true }));
  }
} finally {
  await browser?.close();
  server.kill();
}
