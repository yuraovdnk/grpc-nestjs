import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { lastValueFrom } from 'rxjs';

@Controller('app')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await lastValueFrom(this.usersService.getFilteredUsers());
    console.log('result', users);
    return users;
  }
}
