import { BirthdayService } from '../src/BirthdayService';
import { beforeEach, expect, it } from '@jest/globals';
import { XDate } from '../src/XDate';
import { InMemoryEmployeeRepository } from '../src/InMemoryEmployeeRepository';
import { Employee } from '../src/Employee';
import { SpyingBirthdayGreetingSender } from '../src/SpyingBirthdayGreetingSender';

describe('BirthdayService', () => {
  let birthdayService: BirthdayService;
  let birthdayGreetingSender: SpyingBirthdayGreetingSender;

  beforeEach(() => {
    birthdayGreetingSender = new SpyingBirthdayGreetingSender();
    birthdayService = new BirthdayService(
      new InMemoryEmployeeRepository([
        new Employee('John', 'Doe', '1982/10/08', 'john.doe@foobar.com'),
        new Employee('Mary', 'Ann', '1975/03/11', 'mary.ann@foobar.com'),
      ]),
      birthdayGreetingSender,
    );
  });

  it("will send greetings when it's somebody's birthday", async () => {
    await birthdayService.sendGreetings(new XDate('2008/10/08'));

    expect(birthdayGreetingSender.receivedEmails.length).toBe(1);

    const message = birthdayGreetingSender.receivedEmails.at(0);
    expect(message.body).toBe('Happy Birthday, dear John');
    expect(message.subject).toBe('Happy Birthday!');
    expect(message.to).toBe('john.doe@foobar.com');
  });

  it("will not send email when nobody's birthday", async () => {
    await birthdayService.sendGreetings(new XDate('2008/01/01'));

    expect(birthdayGreetingSender.receivedEmails.length).toBe(0);
  });
});
