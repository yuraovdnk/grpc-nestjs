import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  FilteredUsersResponse,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '../../../../../generated/users';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private userServiceClient: UserServiceClient;
  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  getFilteredUsers(): Observable<FilteredUsersResponse> {
    return this.userServiceClient.getFilteredUsers({});
  }
}
