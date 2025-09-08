import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersService } from './service/users.service';
import { join } from 'path';
import process from 'node:process';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '../../../../generated/users';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto/users.proto'),
          url: `${process.env.GRPC_SERVER_HOST}:${process.env.GRPC_SERVER_PORT}`,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
