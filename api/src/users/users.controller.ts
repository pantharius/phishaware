import { Controller, Post, Body, Injectable, Inject } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
@Controller('users')
export class UsersController {
  @Inject() usersService: UsersService;

  @Post('register')
  async registerUser(@Body('email') email: string) {
    return this.usersService.registerUser(email);
  }

  @Post('confirm-email')
  async confirmEmail(
    @Body() { userId, code }: { userId: number; code: string },
  ) {
    return this.usersService.confirmEmail(userId, code);
  }

  @Post('confirm-phone')
  async confirmPhone(
    @Body() { userId, code }: { userId: number; code: string },
  ) {
    return this.usersService.confirmPhone(userId, code);
  }

  @Post('update-user')
  async updateUser(
    @Body() { userId, details }: { userId: number; details: any },
  ) {
    return this.usersService.updateUserDetails(userId, details);
  }
}
