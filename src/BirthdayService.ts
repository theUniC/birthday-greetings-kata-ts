import { XDate } from './XDate';
import * as nodemailer from 'nodemailer';
import { EmployeeRepository } from './EmployeeRepository';
import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';

export class BirthdayService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async sendGreetings(
    xDate: XDate,
    smtpHost: string,
    smtpPort: number,
  ): Promise<void> {
    const employees = this.employeeRepository.employeesWhoseBirthdayIs(xDate);

    for (const employee of employees) {
      const message = BirthdayGreetingMessage.to(employee);

      await this.sendMessage(smtpHost, smtpPort, message);
    }
  }

  protected async sendMessage(
    smtpHost: string,
    smtpPort: number,
    message: BirthdayGreetingMessage,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
    });

    await transporter.sendMail({
      from: message.from,
      to: message.to,
      subject: message.subject,
      text: message.body,
    });
  }
}
