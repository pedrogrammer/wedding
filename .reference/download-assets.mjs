import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const original = await fs.readFile('.reference/original.html', 'utf8');
const output = 'public/invitation/assets';
await fs.mkdir(output, { recursive: true });
const urls = new Set([...original.matchAll(/https:\/\/[^\s"'<>\\]+/g)].map(m => m[0].replace(/&amp;/g, '&').replace(/\);?$/, '')));
// Only source assets, never canonical URLs, map destinations, or analytics.
const allowed = u => /\.(?:png|jpe?g|svg|mp4|mov|mp3|css|js|woff2?|ttf)(?:\?|$)/i.test(u) && !/thb.tildacdn|cloudflare|tilda-stat|fallback|tilda-forms-1.0.min.js/.test(u);
const queue = [...urls].filter(allowed);
queue.push('https://webgencyinvitations.com/custom.css?t=1787037902', 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&display=swap', 'https://fonts.googleapis.com/css2?family=Ovo&display=swap', 'https://static.tildacdn.net/js/tilda-variant-select-1.0.min.js');
const manifest = {};
const texts = new Map();
async function download(url) {
  if (manifest[url]) return;
  const parsed = new URL(url);
  const basename = decodeURIComponent(path.posix.basename(parsed.pathname)).replace(/[^a-zA-Z0-9_.-]/g, '_');
  const filename = `${crypto.createHash('sha256').update(url).digest('hex').slice(0, 10)}-${basename || 'asset'}${parsed.hostname === 'fonts.googleapis.com' ? '.css' : ''}`;
  const dest = path.join(output, filename);
  let bytes;
  try { bytes = await fs.readFile(dest); }
  catch {
    let res;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        res = await fetch(url, {headers: {'User-Agent': 'Mozilla/5.0'}, signal: AbortSignal.timeout(120000)});
        break;
      } catch (error) {
        if (attempt === 4) throw error;
        console.log(`Retry ${attempt + 1}: ${basename}`);
      }
    }
    if (!res.ok) throw new Error(`${res.status}: ${url}`);
    bytes = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(dest, bytes);
  }
  manifest[url] = `assets/${filename}`;
  console.log(`${filename} ${bytes.length}`);
  if (/\.css(?:\?|$)/.test(url) || parsed.hostname === 'fonts.googleapis.com') {
    const css = bytes.toString('utf8');
    texts.set(url, css);
    for (const m of css.matchAll(/url\(["']?([^\s"')]+)["']?\)/g)) {
      const dep = new URL(m[1], url).href;
      if (/\.(?:woff2?|ttf|png|svg|jpe?g)(?:\?|$)/.test(dep)) queue.push(dep);
    }
  }
}
let cursor = 0;
async function worker() { while (cursor < queue.length) await download(queue[cursor++]); }
await Promise.all(Array.from({length: 5}, worker));
for (const [url, css] of texts) {
  let local = css;
  for (const [remote, relative] of Object.entries(manifest)) local = local.split(remote).join(path.posix.basename(relative));
  await fs.writeFile(`public/invitation/${manifest[url]}`, local);
}
await fs.writeFile('.reference/asset-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`Saved ${Object.keys(manifest).length} local assets.`);
