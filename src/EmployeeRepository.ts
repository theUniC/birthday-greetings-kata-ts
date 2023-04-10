import { XDate } from './XDate';
import { Employee } from './Employee';
export interface EmployeeRepository {
  employeesWhoseBirthdayIs(xDate: XDate): Employee[];
}
