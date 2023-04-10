import { XDate } from './XDate';
import { Employee } from './Employee';
import fs from 'fs';
import { parse } from 'csv/sync';
import { EmployeeRepository } from './EmployeeRepository';

export class CsvEmployeeRepository implements EmployeeRepository {
  constructor(private fileName: string = null) {}

  employeesWhoseBirthdayIs(xDate: XDate): Employee[] {
    const data = fs.readFileSync(this.fileName);

    const lines = parse(data, {
      delimiter: ',',
      fromLine: 2,
    }) as string[][];

    const employees = [];

    for (const values of lines) {
      const [lastName, firstName, birthDate, email] = values.map((v) =>
        v.trim(),
      );
      const employee = new Employee(firstName, lastName, birthDate, email);

      if (employee.isBirthday(xDate)) {
        employees.push(employee);
      }
    }

    return employees;
  }
}
