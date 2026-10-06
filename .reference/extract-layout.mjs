import fs from 'node:fs';
const s=fs.readFileSync('.reference/original.html','utf8');
const css=[...s.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
const stripped=s.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'');
const root={tag:'root',attrs:{},children:[]};let stack=[root];
const attrs=t=>Object.fromEntries([...t.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1],m[2]??m[3]]));
for(const token of stripped.match(/<[^>]+>|[^<]+/g)||[]){if(token.startsWith('</')){const closing=token.match(/^<\/([\w-]+)/)?.[1];const index=stack.findLastIndex(n=>n.tag===closing);if(index>0)stack.length=index;continue}if(token.startsWith('<!'))continue;if(token.startsWith('<')){const tag=token.match(/^<([\w-]+)/)?.[1];if(!tag)continue;const n={tag,attrs:attrs(token),children:[]};stack.at(-1).children.push(n);if(!['img','input','source','link','meta','br','hr','path','rect','polygon','line'].includes(tag)&&!token.endsWith('/>'))stack.push(n);}else stack.at(-1).children.push({text:token});}
const all=[];const walk=n=>{all.push(n);for(const c of n.children||[])walk(c)};walk(root);
const texts=n=>n.text??(n.children||[]).map(texts).join('');
const field=(a,k)=>{for(const r of [320,480,640,960])if(a[`data-field-${k}-res-${r}-value`]!==undefined)return a[`data-field-${k}-res-${r}-value`];return a[`data-field-${k}-value`];};
const sections=[];
for(const board of all.filter(n=>n.attrs?.['data-artboard-recid'])){
const nodes=[];const desc=n=>{if(n.attrs?.['data-elem-id'])nodes.push(n);for(const c of n.children||[])desc(c)};desc(board);
const rec=board.attrs['data-artboard-recid'];
sections.push({id:rec,attrs:board.attrs,elements:nodes.map(n=>{const a=n.attrs,id=a['data-elem-id'];const atom=n.children.find(x=>x.attrs?.class?.includes('tn-atom'));const inner=[];const flatten=x=>{inner.push(x);for(const c of x.children||[])flatten(c)};flatten(n);const re=new RegExp('#rec'+rec+' \\.tn-elem\\[data-elem-id="'+id+'"\\] \\.tn-atom\\{([^}]+)\\}','g');const styles=[...css.matchAll(re)].map(m=>m[1]);return {id,type:a['data-elem-type'],top:field(a,'top'),left:field(a,'left'),width:field(a,'width'),height:field(a,'height'),container:field(a,'container'),axisx:field(a,'axisx'),axisy:field(a,'axisy'),text:atom?texts(atom).trim():texts(n).trim(),src:inner.find(x=>x.tag==='img')?.attrs?.['data-original'],html:inner.find(x=>x.tag==='video')?.attrs,styles,attrs:a};})});
}
fs.writeFileSync('.reference/layout.json',JSON.stringify(sections,null,2));
console.log(JSON.stringify(sections.map(s=>({id:s.id,elements:s.elements.map(({attrs,styles,...e})=>({...e,styles:styles.map(s=>s.split(';').filter(v=>/color:|font-|line-height:|text-align:|opacity:|background-image:/.test(v)).join(';')),animation:{style:attrs['data-animate-style'],event:attrs['data-animate-sbs-event'],loop:attrs['data-animate-sbs-loop'],options:attrs['data-animate-sbs-opts']}}))})),null,2));
