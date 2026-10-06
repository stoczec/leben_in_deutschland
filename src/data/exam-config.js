import dataNew from './dataNew.js?base';
import { LAND_NAMES } from './lands';

// Real Einbürgerungstest: 30 general questions + 3 for the test-taker's federal state.
export const GENERAL_COUNT = 30;
export const STATE_COUNT = 3;
export const EXAM_SIZE = GENERAL_COUNT + STATE_COUNT;
export const PASS_THRESHOLD = 17;

export const ansKeyById = new Map(dataNew.map((q) => [q.id, q.answers.ansKey]));
export const generalIds = dataNew.filter((q) => !q.land).map((q) => q.id);
export const stateIdsByLand = dataNew.reduce((acc, q) => {
  if (q.land) (acc[q.land] = acc[q.land] || []).push(q.id);
  return acc;
}, {});

export const LANDS = Object.keys(stateIdsByLand)
  .sort()
  .map((code) => ({ code, name: LAND_NAMES[code] || code }));
