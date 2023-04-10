import { Employee } from './Employee';

export class BirthdayGreetingMessage {
  public readonly subject = 'Happy Birthday!';
  public readonly from: string = 'sender@here.com';

  private constructor(
    public readonly to: string,
    public readonly body: string,
  ) {}

  static to = (employee: Employee): BirthdayGreetingMessage =>
    new BirthdayGreetingMessage(
      employee.getEmail(),
      `Happy Birthday, dear ${employee.getFirstName()}`,
    );
}
