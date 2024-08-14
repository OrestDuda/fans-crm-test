import { Body, Controller, Get, Param, Post, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.model';

@UseGuards(JwtAuthGuard)
@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async addUser(@Body() body: User) {
    return await this.userService.addUser(body);
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }
}