import fs from 'node:fs';
import path from 'node:path';

const source=fs.readFileSync('src/js/main.js','utf8');
const routes=['/fr/','/en/','/fr/about','/en/about','/fr/services-industries','/en/services-industries','/fr/projects','/en/projects','/fr/insights','/en/insights','/fr/actuality','/en/actuality','/fr/sustainability','/en/sustainability','/fr/experts','/en/experts','/fr/careers','/en/careers','/fr/contact','/en/contact','/fr/newsletter','/en/newsletter'];
const missing=routes.filter(r=>!source.includes(r.replace(/\/$/,'')) && !source.includes(r));
if(missing.length){console.error('Route reference check failed:',missing.join(', '));process.exit(1)}
for(const asset of ['public/assets/brand/apah-logo.svg','public/assets/brand/apah-logo-light.svg','public/assets/team/oguzu-lee-denis.jpg','public/assets/team/christian-bakole-mukulu.jpg','public/assets/team/geoffrey-aori-mabea.jpg']){
 if(!fs.existsSync(asset)){console.error('Missing asset:',asset);process.exit(1)}
}
console.log('Source route and supplied-asset checks passed.');
