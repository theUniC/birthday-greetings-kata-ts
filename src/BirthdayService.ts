import { XDate } from './XDate';
import * as nodemailer from 'nodemailer';
import { CsvEmployeeRepository } from './CsvEmployeeRepository';

export class BirthdayService {
  constructor(private employeeRepository: CsvEmployeeRepository) {}

  async sendGreetings(
    fileName: string,
    xDate: XDate,
    smtpHost: string,
    smtpPort: number,
  ): Promise<void> {
    const employees = this.employeeRepository.employeesWhoseBirthdayIs(
      fileName,
      xDate,
    );

    for (const employee of employees) {
      const recipient = employee.getEmail();
      const body = `Happy Birthday, dear ${employee.getFirstName()}`;
      const subject = 'Happy Birthday!';

      await this.sendMessage(
        smtpHost,
        smtpPort,
        'sender@here.com',
        subject,
        body,
        recipient,
      );
    }
  }

  protected async sendMessage(
    smtpHost: string,
    smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
    });

    await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      text: body,
    });
  }
}
