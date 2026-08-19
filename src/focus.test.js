import test from 'node:test';
import assert from 'node:assert/strict';
import { nextStatus, summarize } from './focus.js';

test('cycles a task through planned, in-progress, and done', () => {
  assert.equal(nextStatus('planned'), 'in-progress');
  assert.equal(nextStatus('in-progress'), 'done');
  assert.equal(nextStatus('done'), 'planned');
});

test('summarizes completed and remaining work', () => {
  assert.deepEqual(summarize([
    { status: 'done' },
    { status: 'planned' },
    { status: 'done' }
  ]), { completed: 2, total: 3, remaining: 1 });
});
