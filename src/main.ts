import { BirthdayService } from './BirthdayService';
import { XDate } from './XDate';
import { CsvEmployeeRepository } from './CsvEmployeeRepository';

async function main(): Promise<void> {
  const { pathname: root } = new URL(
    '../resources/employee_data.txt',
    import.meta.url,
  );

  const service = new BirthdayService(new CsvEmployeeRepository(root));
  await service.sendGreetings(new XDate(), 'localhost', 25);
}

if (require.main === module) {
  await main();
}
