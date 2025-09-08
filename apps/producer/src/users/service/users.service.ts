import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from '../infra/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getFilteredUsers(): Promise<User[]> {
    const users = await this.usersRepository.getAll();
    const filtered = users.filter((user) => user.age >= 18);
    return filtered;
  }
}
