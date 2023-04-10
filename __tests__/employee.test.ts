import { describe, expect, test } from '@jest/globals';
import { Employee } from '../src/Employee.js';
import { XDate } from '../src/XDate.js';

describe('Employee', () => {
  test('birthday', () => {
    const employee = new Employee('foo', 'bar', '1990/01/31', 'a@b.c');
    expect(employee.isBirthday(new XDate('2008/01/30'))).toBe(false);
    expect(employee.isBirthday(new XDate('2008/01/31'))).toBe(true);
  });

  test('equal', () => {
    const base = new Employee('First', 'Last', '1999/09/01', 'first@last.com');
    const same = new Employee('First', 'Last', '1999/09/01', 'first@last.com');
    const different = new Employee(
      'First',
      'Last',
      '1999/09/01',
      'boom@boom.com',
    );

    expect(base.equals(null)).toBe(false);
    expect(base.equals(same)).toBe(true);
    expect(base.equals(different)).toBe(false);
  });
});
