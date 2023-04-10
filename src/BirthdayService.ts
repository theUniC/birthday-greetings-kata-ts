import { XDate } from './XDate';
import { EmployeeRepository } from './EmployeeRepository';
import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';
import { NodemailerBirthdayGreetSender } from './NodemailerBirthdayGreetSender';

export class BirthdayService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private birthdayGreetSender: NodemailerBirthdayGreetSender,
  ) {}

  async sendGreetings(xDate: XDate): Promise<void> {
    const employees = this.employeeRepository.employeesWhoseBirthdayIs(xDate);

    for (const employee of employees) {
      const message = BirthdayGreetingMessage.to(employee);

      await this.sendMessage(message);
    }
  }

  protected async sendMessage(message: BirthdayGreetingMessage): Promise<void> {
    await this.birthdayGreetSender.send(message);
  }
}
