import fs from 'node:fs/promises';
const manifest=JSON.parse(await fs.readFile('public/invitation/asset-manifest.json','utf8'));
const roles={
'envelope.png':'714d9e1676-ChatGPT_Image_Jun_23_2026_04_40_29_PM_4_piptqn.png',
'opening.mp4':'7df7b45a33-1782224012851_1_m6ww6v.mp4',
'garden.mov':'cde6ac7a50-Swans2_1_qwzsod.mov',
'music.mp3':'7f2439975a-Einaudi__Divenire__1___1_.mp3',
'hero-paper.webp':'22893afd920ad43b.webp',
'hero-flowers-left.webp':'09b2d6033e722844.webp',
'hero-flowers-right.webp':'7ccd3fd110acd065.webp',
'hero-top-floral.webp':'9c1edade70528b08.webp',
'hero-ornament.webp':'8bc2d8fd85e21b4e.webp',
'schedule-paper-top.webp':'941d2e4f950830d3.webp',
'schedule-paper-bottom.webp':'3799f4ac4d3b161b.webp',
'rose.webp':'4a25c79c5571b06c.webp',
'heading-right.webp':'abea444c953cccd9.webp',
'heading-left.webp':'93ce2c0f1b48cba2.webp',
'location-ornament.webp':'44c61cc8753f66c1.webp',
'venue.webp':'b0ef0a061f0329a9.webp',
'petal-1.webp':'7da43b7ea19e1d6f.webp',
'petal-2.webp':'2c09709b17ec4b77.webp',
'petal-3.webp':'092babc9fb098fc0.webp',
'petal-4.webp':'eb3b4e05bc9a1f95.webp',
'petal-5.webp':'db0ebc7d9bd2cd85.webp',
'petal-6.webp':'5dd68f3a142d36eb.webp',
'map-frame.svg':'ba04b3abe70fae8d.svg',
'map-ornament-top.webp':'23631a500f3dfe99.webp',
'map-ornament-bottom.webp':'3e869e0cba4e5704.webp',
'dress-rose.webp':'7e94eb66554a9654.webp',
'dress-paper.webp':'77a8ae210821c063.webp',
'dress-top-floral.webp':'f643bfacc88c2aef.webp',
'dress-flowers-right.webp':'75f65d884e487082.webp',
'dress-flowers-left.webp':'759661483ddb787b.webp',
'rsvp-seal.webp':'ad6abeec550b1545.webp',
'footer-photo.webp':'b79c2008a32fb544.webp',
'footer-flowers.webp':'7c2e955848e68375.webp',
};
await fs.mkdir('public/assets',{recursive:true});
for(const [name,source]of Object.entries(roles))await fs.copyFile('public/invitation/assets/'+source,'public/assets/'+name);
const provenance=Object.fromEntries(Object.entries(roles).map(([name,source])=>[name,Object.entries(manifest).filter(([,value])=>value==='assets/'+source).map(([key])=>key)]));
await fs.writeFile('.reference/native-assets.json',JSON.stringify(provenance,null,2));
console.log(`Copied ${Object.keys(roles).length} original visual and media assets.`);
