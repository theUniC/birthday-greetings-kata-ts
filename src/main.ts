import { BirthdayService } from './BirthdayService';
import { XDate } from './XDate';
import { CsvEmployeeRepository } from './CsvEmployeeRepository';
import { NodemailerBirthdayGreetSender } from './NodemailerBirthdayGreetSender';
import * as nodemailer from 'nodemailer';

async function main(): Promise<void> {
  const { pathname: root } = new URL(
    '../resources/employee_data.txt',
    import.meta.url,
  );

  const service = new BirthdayService(
    new CsvEmployeeRepository(root),
    new NodemailerBirthdayGreetSender(
      nodemailer.createTransport({
        host: 'localhost',
        port: 25,
      }),
    ),
  );

  await service.sendGreetings(new XDate());
}

if (require.main === module) {
  await main();
}
