import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';
import { Transporter } from 'nodemailer';
import { BirthdayGreetingSender } from './BirthdayGreetingSender';

export class NodemailerBirthdayGreetSender implements BirthdayGreetingSender {
  constructor(private transporter: Transporter) {}

  async send(message: BirthdayGreetingMessage): Promise<void> {
    const mailOptions = {
      from: message.from,
      to: message.to,
      subject: message.subject,
      text: message.body,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
