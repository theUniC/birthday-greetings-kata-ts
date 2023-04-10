import { XDate } from './XDate';
import { EmployeeRepository } from './EmployeeRepository';
import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';
import { BirthdayGreetingSender } from './BirthdayGreetingSender';

export class BirthdayService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private birthdayGreetSender: BirthdayGreetingSender,
  ) {}

  async sendGreetings(xDate: XDate): Promise<void> {
    const employees = this.employeeRepository.employeesWhoseBirthdayIs(xDate);

    for (const employee of employees) {
      const message = BirthdayGreetingMessage.to(employee);
      await this.birthdayGreetSender.send(message);
    }
  }
}
