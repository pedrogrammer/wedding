import fs from 'node:fs/promises';

let html = await fs.readFile('.reference/original.html', 'utf8');
const manifest = JSON.parse(await fs.readFile('.reference/asset-manifest.json', 'utf8'));
// Keep the reference's layout and motion, with independently stored assets.
html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, body) =>
  /cloudflareinsights|tilda-fallback|tilda-forms-1\.0|tilda-stat|window\.mainTracker|tilda-variant-select/.test(attrs + body) ? '' : whole);
html = html.replace(/<link\b[^>]*(?:rel="canonical"|rel="dns-prefetch")[^>]*>/gi, '');
html = html.replace(/<meta\b[^>]*property="og:url"[^>]*>/gi, '');
html = html.replace(/data-tilda-formskey="[^"]*"/g, '');
html = html.replace('js-form-proccess', 'local-rsvp-form');
// Local assets load much faster than the remote originals. Wait for the document
// before starting runtimes that observe document.body.
html = html.replace(/(<script\b[^>]*\bsrc=[^>]*?)\basync\b/g, '$1defer');
html = html.replace('/custom.css?t=1787037902', manifest['https://webgencyinvitations.com/custom.css?t=1787037902']);
html = html.replace(/https:\/\/thb\.tildacdn\.net\/([^/]+)\/-\/resize\/20x\/([^\s"'<>]+)/g,
  (whole, id, file) => manifest[`https://static.tildacdn.net/${id}/${file}`] || whole);
for (const [remote, local] of Object.entries(manifest).sort((a, b) => b[0].length - a[0].length)) html = html.split(remote).join(local);
html = html.replace('<html>', '<html lang="en">');
html = html.replace('</head>', '<script src="local-interactions.js" defer></script></head>');
await fs.writeFile('public/invitation/index.html', html.replace(/>\s*</g, '>\n<'));
await fs.writeFile('public/invitation/asset-manifest.json', JSON.stringify(manifest, null, 2));
console.log('Prepared standalone invitation with local assets.');
