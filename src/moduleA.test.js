import { expect } from '@jest/globals';
import { moduleA } from './moduleA';

test('working', () => {
  expect(moduleA).toBe('moduleB is changed!');
});
