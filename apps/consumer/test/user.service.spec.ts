import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/service/users.service';
import { of } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FilteredUsersResponse,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '../../../generated/users';

describe('Consumer: UsersService', () => {
  let service: UsersService;
  let grpcClientMock: Partial<ClientGrpc>;
  let userServiceClientMock: Partial<UserServiceClient>;

  const mockResponse: FilteredUsersResponse = {
    users: [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Charlie', age: 30 },
    ],
  };

  beforeEach(async () => {
    userServiceClientMock = {
      getFilteredUsers: jest.fn().mockReturnValue(of(mockResponse)),
    };

    grpcClientMock = {
      getService: jest.fn().mockReturnValue(userServiceClientMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: USER_PACKAGE_NAME, useValue: grpcClientMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize userServiceClient onModuleInit', () => {
    service.onModuleInit();
    expect(grpcClientMock.getService).toHaveBeenCalledWith(USER_SERVICE_NAME);
    expect(service['userServiceClient']).toBe(userServiceClientMock);
  });

  it('getFilteredUsers should call gRPC client and return users', (done) => {
    service.onModuleInit();
    service.getFilteredUsers().subscribe((result) => {
      expect(userServiceClientMock.getFilteredUsers).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResponse);
      done();
    });
  });
});
