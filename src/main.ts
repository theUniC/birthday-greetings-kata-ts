import { BirthdayService } from './BirthdayService';
import { XDate } from './XDate';
import { CsvEmployeeRepository } from './CsvEmployeeRepository';

async function main(): Promise<void> {
  const service = new BirthdayService(new CsvEmployeeRepository());
  await service.sendGreetings(
    'employee_data.txt',
    new XDate(),
    'localhost',
    25,
  );
}

if (require.main === module) {
  await main();
}
