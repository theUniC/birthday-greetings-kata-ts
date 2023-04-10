export class XDate {
  private readonly date: Date;

  constructor(yyyyMMdd: string | null = null) {
    this.date = new Date(yyyyMMdd);
  }

  getDay = (): number => this.date.getDate();
  getMonth = (): number => 1 + this.date.getMonth();

  isSameDay = (anotherDate: XDate): boolean => {
    return (
      anotherDate.date.getMonth() === this.date.getMonth() &&
      anotherDate.date.getDate() === this.date.getDate()
    );
  };

  equals = (anotherDate: XDate): boolean =>
    anotherDate !== null && anotherDate.date.getTime() === this.date.getTime();
}
