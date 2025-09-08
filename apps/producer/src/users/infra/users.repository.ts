import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFile } from 'fs/promises';

export interface User {
  id: number;
  name: string;
  age: number;
}

@Injectable()
export class UsersRepository {
  async getAll(): Promise<User[]> {
    try {
      const filePath = join(__dirname, 'data/users.json');
      const content = await readFile(filePath, { encoding: 'utf-8' });
      return JSON.parse(content);
    } catch (error) {
      throw new Error('Error reading users file:', error);
    }
  }
}
