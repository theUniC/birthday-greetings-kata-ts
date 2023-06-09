import { BirthdayService } from '../src/BirthdayService.js';
import { beforeEach, expect, it } from '@jest/globals';
import { XDate } from '../src/XDate.js';
import * as nodemailer from 'nodemailer';
import { Transport } from 'nodemailer';
import MailMessage from 'nodemailer/lib/mailer/mail-message.js';

class TestableBirthdayService extends BirthdayService {
  constructor(private transport: Transport) {
    super();
  }

  protected async sendMessage(
    _smtpHost: string,
    _smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport(this.transport);

    await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      text: body,
    });
  }
}

describe('BirthdayService', () => {
  const NONSTANDARD_PORT = 9999;
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
    await birthdayService.sendGreetings(
      'employee_data.txt',
      new XDate('2008/10/08'),
      'localhost',
      NONSTANDARD_PORT,
    );

    expect(receivedEmails.length).toBe(1);

    const message = receivedEmails.at(0);
    expect(message.data.text).toBe('Happy Birthday, dear John');
    expect(message.data.subject).toBe('Happy Birthday!');
    expect(message.data.to).toBe('john.doe@foobar.com');
  });

  it("will not send email when nobody's birthday", async () => {
    await birthdayService.sendGreetings(
      'employee_data.txt',
      new XDate('2008/01/01'),
      'localhost',
      NONSTANDARD_PORT,
    );

    expect(receivedEmails.length).toBe(0);
  });
});
