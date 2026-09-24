import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const forbidden = [
  /\[TO BE VERIFIED\]/i,
  /\[TO BE SUPPLIED\]/i,
  /\bTODO\b/i,
  /\bTBD\b/i,
  /Lorem ipsum/i,
  /example\.com/i,
  /John Doe/i,
  /Coming soon/i
];

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const publicFiles = walk(dist).filter(file => /\.(html|js|css|json|xml|txt|svg)$/i.test(file));
const failures = [];

for (const file of publicFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of forbidden) {
    if (pattern.test(text)) failures.push(`${file}: ${pattern}`);
  }
}

if (failures.length) {
  console.error('Placeholder scanner failed:');
  console.error(failures.join('\\n'));
  process.exit(1);
}

console.log(`Placeholder scanner passed for ${publicFiles.length} rendered files.`);
