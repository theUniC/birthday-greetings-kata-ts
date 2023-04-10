import { XDate } from './XDate';
import { Employee } from './Employee';
import { EmployeeRepository } from './EmployeeRepository';

export class InMemoryEmployeeRepository implements EmployeeRepository {
  constructor(private employees: Employee[]) {}

  employeesWhoseBirthdayIs(xDate: XDate): Employee[] {
    return this.employees.filter((e) => e.isBirthday(xDate));
  }
}
