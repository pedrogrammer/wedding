import fs from 'node:fs';
const p='.reference/extract-layout.mjs';let s=fs.readFileSync(p,'utf8');s=s.replace("if(token.startsWith('</')){stack.pop();continue}","if(token.startsWith('</')){const closing=token.match(/^<\\/([\\w-]+)/)?.[1];const index=stack.findLastIndex(n=>n.tag===closing);if(index>0)stack.length=index;continue}");fs.writeFileSync(p,s);
