// src/users/users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private users = [];

  @Get()
  getUsers() {
    return this.users;
  }

  @Post()
  addUser(@Body() user: any) {
    this.users.push(user);
    return { message: 'User added successfully' };
  }
}
