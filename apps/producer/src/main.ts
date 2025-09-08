import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '../../../generated/users';
import process from 'node:process';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProducerModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/users.proto'),
        url: `${process.env.GRPC_SERVER_HOST}:${process.env.GRPC_SERVER_PORT}`,
      },
    },
  );
  await app.listen();
}
bootstrap();
