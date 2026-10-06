import fs from 'node:fs';
const s=fs.readFileSync('.reference/original.html','utf8');
fs.writeFileSync('.reference/readable.html',s.replace(/></g,'>\n<'));
console.log(s.slice(s.indexOf('<body'),s.indexOf("t396_init('2487446043')")+100).slice(0,24000));
console.log('\nFORM\n'+s.slice(s.indexOf('id="rec2487446233"'),s.indexOf('id="rec2487446253"')).slice(0,20000));
console.log('\nFONTS\n'+[...s.matchAll(/.{0,150}(?:woff2?|ttf|font-face).{0,150}/g)].map(m=>m[0]).join('\n'));
