import fs from 'node:fs';
const s=fs.readFileSync('.reference/original.html','utf8');
console.log([...s.matchAll(/<div[^>]*class=['"][^'"]*tn-group[^'"]*['"][^>]*>/g)].map(m=>m[0]).join('\n'));
console.log([...s.matchAll(/<div[^>]*class=['"][^'"]*t396__artboard[^'"]*['"][^>]*>/g)].map(m=>m[0]).join('\n'));
