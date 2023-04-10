import { BirthdayService } from '../src/BirthdayService';
import { beforeEach, expect, it } from '@jest/globals';
import { XDate } from '../src/XDate';
import * as nodemailer from 'nodemailer';
import { Transport } from 'nodemailer';
import MailMessage from 'nodemailer/lib/mailer/mail-message';
import { CsvEmployeeRepository } from '../src/CsvEmployeeRepository';
import { BirthdayGreetingMessage } from '../src/BirthdayGreetingMessage';
import { NodemailerBirthdayGreetSender } from '../src/NodemailerBirthdayGreetSender';

class TestableBirthdayService extends BirthdayService {
  constructor(private transport: Transport) {
    const { pathname: root } = new URL(
      '../resources/employee_data.txt',
      import.meta.url,
    );

    super(
      new CsvEmployeeRepository(root),
      new NodemailerBirthdayGreetSender(nodemailer.createTransport(transport)),
    );
  }

  protected async sendMessage(message: BirthdayGreetingMessage): Promise<void> {
    const transporter = nodemailer.createTransport(this.transport);

    await transporter.sendMail({
      from: message.from,
      to: message.to,
      subject: message.subject,
      text: message.body,
    });
  }
}

describe('BirthdayService', () => {
  let birthdayService: BirthdayService;
  let receivedEmails: MailMessage[] = [];
  const transport: Transport = {
    name: 'minimal',
    version: '0.1.0',
    send: (mail, callback): void => {
      receivedEmails.push(mail);
      callback(null, true);
    },
  };

  beforeEach(() => {
    birthdayService = new TestableBirthdayService(transport);
    receivedEmails = [];
  });

  it("will send greetings when it's somebody's birthday", async () => {
    await birthdayService.sendGreetings(new XDate('2008/10/08'));

    expect(receivedEmails.length).toBe(1);

    const message = receivedEmails.at(0);
    expect(message.data.text).toBe('Happy Birthday, dear John');
    expect(message.data.subject).toBe('Happy Birthday!');
    expect(message.data.to).toBe('john.doe@foobar.com');
  });

  it("will not send email when nobody's birthday", async () => {
    await birthdayService.sendGreetings(new XDate('2008/01/01'));

    expect(receivedEmails.length).toBe(0);
  });
});
