import fs from 'node:fs';
const s=fs.readFileSync('.reference/original.html','utf8');const i=s.indexOf('<iframe');console.log(s.slice(i-1800,i+1600));
