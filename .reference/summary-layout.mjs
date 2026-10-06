import fs from 'node:fs';
const all=JSON.parse(fs.readFileSync('.reference/layout.json','utf8')).filter(s=>s.elements.length);
for(const s of all)console.log(s.id,JSON.stringify(s.elements.map(e=>({id:e.id,type:e.type,text:e.text,top:e.top,left:e.left,width:e.width,height:e.height,src:e.src?.split('/').slice(-2).join('/'),attrs:Object.fromEntries(Object.entries(e.attrs).filter(([k])=>/animate-(duration|delay|distance)|fileheight|filewidth|heightmode|imagefit/.test(k)))}))));
const html=fs.readFileSync('.reference/original.html','utf8');
for(const id of ['1763402147625','1780748008617000003','1780748008617000005']){const re=new RegExp("<div class='tn-atom'field='tn_text_"+id+"'>([\\s\\S]*?)</div>");console.log(id,html.match(re)?.[1]);}
const start=html.indexOf('<div id="countdownContainer"');console.log(html.slice(start-7000,start+2000));
