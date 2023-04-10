import { describe, expect, test } from '@jest/globals';
import { XDate } from '../src/XDate.js';

describe('XDate', () => {
  test('Getters', () => {
    const date = new XDate('1789/01/24');
    expect(date.getDay()).toBe(24);
    expect(date.getMonth()).toBe(1);
  });

  test('Is same date', () => {
    const date = new XDate('1789/01/24');
    const sameDay = new XDate('2001/01/24');
    const notSameDay = new XDate('1789/01/25');
    const notSameMonth = new XDate('1789/02/25');

    expect(date.isSameDay(sameDay)).toBe(true);
    expect(date.isSameDay(notSameDay)).toBe(false);
    expect(date.isSameDay(notSameMonth)).toBe(false);
  });

  test('equality', () => {
    const base = new XDate('2000/01/02');
    const same = new XDate('2000/01/02');
    const different = new XDate('2000/01/04');

    expect(base.equals(null)).toBe(false);
    expect(base.equals(base)).toBe(true);
    expect(base.equals(same)).toBe(true);
    expect(base.equals(different)).toBe(false);
  });
});
