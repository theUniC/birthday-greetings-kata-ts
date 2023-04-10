import { BirthdayGreetingMessage } from './BirthdayGreetingMessage';

export interface BirthdayGreetingSender {
  send(message: BirthdayGreetingMessage): Promise<void>;
}
