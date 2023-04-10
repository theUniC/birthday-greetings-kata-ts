import { XDate } from './XDate';
import { Employee } from './Employee';
import fs from 'fs';
import { parse } from 'csv/sync';

export class CsvEmployeeRepository {
  employeesWhoseBirthdayIs(fileName: string, xDate: XDate): Employee[] {
    const { pathname: root } = new URL(
      `../resources/${fileName}`,
      import.meta.url,
    );

    const data = fs.readFileSync(root);

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
