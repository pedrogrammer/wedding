import fs from 'node:fs';
const s=fs.readFileSync('.reference/original.html','utf8');
const urls=[...new Set([...s.matchAll(/(?:src|href|data-original)=["']([^"']+)["']/g)].map(m=>m[1]).filter(x=>x.startsWith('http')))];
console.log(JSON.stringify(urls,null,2));
console.log('\nINLINE SCRIPTS\n');
console.log([...s.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(x=>x.length<15000).join('\n'));
