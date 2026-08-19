import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const roots = ['public', 'src', 'scripts'];
const allowed = new Set(['.js', '.mjs']);
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (allowed.has(entry.name.slice(entry.name.lastIndexOf('.')))) files.push(path);
  }
}

for (const root of roots) await collect(root);
for (const file of files) {
  const source = await import('node:fs/promises').then((fs) => fs.readFile(file, 'utf8'));
  if (file.startsWith('public') && /console\.log\s*\(/.test(source)) throw new Error(`console.log is not allowed in ${file}`);
  if (/\t/.test(source)) throw new Error(`Tabs are not allowed in ${file}`);
}
console.log(`Lint passed: ${files.length} JavaScript files checked.`);
