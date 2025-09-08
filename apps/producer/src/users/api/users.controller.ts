import { Controller } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import {
  EmptyRequest,
  FilteredUsersResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from '../../../../../generated/users';

@UserServiceControllerMethods()
@Controller()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  async getFilteredUsers(
    request: EmptyRequest,
  ): Promise<FilteredUsersResponse> {
    const users = await this.usersService.getFilteredUsers();
    return { users };
  }
}
