import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from './enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ---------------------------------------------------------------------------
  @Post('create')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: UserRole,
  ) {
    return this.userService.createUser(username, password, role);
  }

  // ---------------------------------------------------------------------------
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return { message: 'Login successful', user };
  }
}
