import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { UsersService } from './service/users.service';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from './infra/users.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
