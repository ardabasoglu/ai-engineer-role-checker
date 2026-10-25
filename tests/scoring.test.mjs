import assert from 'node:assert/strict';
import { score } from '../functions/_lib/scoring.js';

const ids = ['b1','b2','b3','b4','r1','r2','r3','r4','s1','s2','s3','s4','j1','j2','j3','j4','l1','l2','l3','l4'];
const allYes = { answers: ids.map(id => ({ id, answer: 'yes' })) };
const allNo = { answers: ids.map(id => ({ id, answer: 'no' })) };
const partial = { answers: [{ id: 'b1', answer: 'yes' }, { id: 'r1', answer: 'maybe' }] };

const strong = score(allYes);
assert.equal(strong.score, 100);
assert.equal(strong.verdict, 'Agent-era engineering lead.');
assert.equal(strong.answered, 20);

const weak = score(allNo);
assert.equal(weak.score, 0);
assert.equal(weak.verdict, 'High displacement risk.');
assert.equal(weak.answered, 20);

const partialResult = score(partial);
assert.equal(partialResult.answered, 2);
assert.equal(partialResult.verdict, 'Needs more signal.');
assert.equal(partialResult.nextSteps.length, 1);

const sanitized = score({ answers: [
  { id: 'b1', answer: 'yes' },
  { id: 'b1', answer: 'yes' },
  { id: 'bad', answer: 'yes' },
  { id: 'r1', answer: 'invalid' },
  { id: 'j1', answer: 'maybe' }
] });
assert.equal(sanitized.answered, 2);

console.log('scoring tests passed');
