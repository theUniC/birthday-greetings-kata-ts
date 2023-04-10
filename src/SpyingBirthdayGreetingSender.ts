import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';
import { BirthdayGreetingSender } from './BirthdayGreetingSender';

export class SpyingBirthdayGreetingSender implements BirthdayGreetingSender {
  public readonly receivedEmails: BirthdayGreetingMessage[] = [];

  send(message: BirthdayGreetingMessage): Promise<void> {
    this.receivedEmails.push(message);
    return Promise.resolve();
  }
}
