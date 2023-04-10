import { BirthdayService } from './BirthdayService.js';
import { XDate } from './XDate.js';

async function main(): Promise<void> {
  const service = new BirthdayService();
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
