import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/service/users.service';
import { UsersRepository, User } from '../src/users/infra/users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUsers: User[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 17 },
    { id: 3, name: 'Charlie', age: 30 },
  ];

  const mockUsersRepository = {
    getAll: jest.fn().mockResolvedValue(mockUsers),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call usersRepository.getAll', async () => {
    await service.getFilteredUsers();
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should return only adult users', async () => {
    const result = await service.getFilteredUsers();
    expect(result).toEqual([
      { id: 1, name: 'Alice', age: 25 },
      { id: 3, name: 'Charlie', age: 30 },
    ]);
  });

  it('should ensure all returned users are adults', async () => {
    const result = await service.getFilteredUsers();
    const allAdults = result.every((u) => u.age >= 18);
    expect(allAdults).toBe(true);
  });
});
