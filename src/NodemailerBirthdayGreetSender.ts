import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';
import { Transporter } from 'nodemailer';

export class NodemailerBirthdayGreetSender {
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
