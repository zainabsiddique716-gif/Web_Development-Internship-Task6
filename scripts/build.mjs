import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await mkdir('dist/src', { recursive: true });
await cp('src/focus.js', 'dist/src/focus.js');
console.log('Build complete: public assets copied to dist/.');
