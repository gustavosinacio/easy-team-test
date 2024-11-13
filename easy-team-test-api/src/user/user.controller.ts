import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { USER_ROLE } from './enums/userRole';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: USER_ROLE,
    @Body('employeeId') employeeId: string,
  ) {
    return this.userService.createUser(username, password, role, employeeId);
  }

  @Get(':username')
  async findById(@Param('username') username: string) {
    const { id, role, employee } =
      await this.userService.findByUsername(username);
    return { id, username, role, employee };
  }
}
