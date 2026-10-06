import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const manifests = [
  'C:/Users/PEDRAM~1/AppData/Local/Temp/browser-use/assets/b099a896-b751-4e4f-acf3-a32555a8a4d2/manifest.json',
  'C:/Users/PEDRAM~1/AppData/Local/Temp/browser-use/assets/8d3d95a7-2b77-453a-9efa-149b732c4407/manifest.json',
  'C:/Users/PEDRAM~1/AppData/Local/Temp/browser-use/assets/edf72f5b-622d-4758-a079-59f9b21d44cc/manifest.json',
];
const original = await fs.readFile('.reference/original.html', 'utf8');
const mapping = {};
for (const match of original.matchAll(/https:\/\/[^\s"'<>\\]+/g)) {
  const url = match[0];
  const basename = decodeURIComponent(path.posix.basename(new URL(url).pathname)).replace(/[^a-zA-Z0-9_.-]/g, '_');
  const filename = `${crypto.createHash('sha256').update(url).digest('hex').slice(0, 10)}-${basename}`;
  try { await fs.access(`public/invitation/assets/${filename}`); mapping[url] = `assets/${filename}`; } catch { /* Not yet downloaded. */ }
}
for (const file of manifests) {
  const bundle = JSON.parse(await fs.readFile(file, 'utf8'));
  for (const asset of bundle.assets) {
    const ext = path.extname(asset.path) || '.css';
    const filename = `${asset.id}${ext}`;
    await fs.copyFile(asset.path, `public/invitation/assets/${filename}`);
    mapping[asset.url] = `assets/${filename}`;
    if (asset.url.includes('optim.tildacdn.net')) {
      const id = new URL(asset.url).pathname.split('/')[1];
      const sourceName = asset.name.replace(/\.webp$/, '');
      mapping[`https://static.tildacdn.net/${id}/${sourceName}`] = `assets/${filename}`;
    }
  }
}
await fs.writeFile('.reference/asset-manifest.json', JSON.stringify(mapping, null, 2));
console.log(`Imported ${Object.keys(mapping).length} asset mappings.`);
