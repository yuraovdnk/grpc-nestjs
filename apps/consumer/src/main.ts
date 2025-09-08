import { NestFactory } from '@nestjs/core';
import process from 'node:process';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  await app.listen(Number(process.env.API_PORT));
}
bootstrap();
