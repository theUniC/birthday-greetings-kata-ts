import { XDate } from './XDate';

export class Employee {
  private readonly birthDate: XDate;

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    birthDate: string,
    private readonly email: string,
  ) {
    this.birthDate = new XDate(birthDate);
  }

  isBirthday = (today: XDate): boolean => today.isSameDay(this.birthDate);
  getEmail = (): string => this.email;
  getFirstName = (): string => this.firstName;
  toString = (): string =>
    `Employee ${this.firstName} ${this.lastName} <${this.email}> born ${this.birthDate}`;

  equals = (other: Employee): boolean =>
    null !== other &&
    this.email === other.email &&
    this.firstName === other.firstName &&
    this.lastName === other.lastName;
}
