import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await mkdir('dist/public/src', { recursive: true });
await cp('src/focus.js', 'dist/public/src/focus.js');
console.log('Build complete: public assets copied to dist/.');
