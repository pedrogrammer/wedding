import fs from 'node:fs';
for(const section of JSON.parse(fs.readFileSync('.reference/layout.json','utf8')).filter(s=>s.elements.length))for(const e of section.elements.filter(e=>e.id.startsWith('178246041')))console.log(e.id,e.attrs['data-animate-sbs-opts']);
