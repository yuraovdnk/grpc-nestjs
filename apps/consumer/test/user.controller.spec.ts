import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UsersController } from '../src/users/api/users.controller';
import { UsersService } from '../src/users/service/users.service';
import { User } from '../../../generated/users';

describe('Producer: UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 17 },
    { id: 3, name: 'Charlie', age: 30 },
  ];

  const filteredUsers = mockUsers.filter((u) => u.age >= 18);

  const mockUsersService = {
    getFilteredUsers: jest.fn().mockReturnValue(of({ users: filteredUsers })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call UsersService.getFilteredUsers once', async () => {
    await controller.getUsers();
    expect(service.getFilteredUsers).toHaveBeenCalledTimes(1);
  });

  it('should return only adult users', async () => {
    const result = await controller.getUsers();
    expect(result.users).toEqual([
      { id: 1, name: 'Alice', age: 25 },
      { id: 3, name: 'Charlie', age: 30 },
    ]);
  });

  it('should not include underage users', async () => {
    const result = await controller.getUsers();
    expect(result.users.some((u) => u.age < 18)).toBe(false);
  });
});
