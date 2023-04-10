import { XDate } from './XDate.js';
import { parse } from 'csv/sync';
import { Employee } from './Employee.js';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

export class BirthdayService {
  async sendGreetings(
    fileName: string,
    xDate: XDate,
    smtpHost: string,
    smtpPort: number,
  ): Promise<void> {
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
