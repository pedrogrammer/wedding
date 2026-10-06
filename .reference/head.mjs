import fs from 'node:fs';
const s=fs.readFileSync('.reference/original.html','utf8');
console.log(s.slice(0,s.indexOf('<body')));
console.log(s.slice(-3500));
