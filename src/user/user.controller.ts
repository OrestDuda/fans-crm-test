import { Body, Controller, Get, Param, Post, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './create-user.dto';

@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-user')
  async addUser(@Body() body: CreateUserDto) {
    try {
      const user = await this.userService.addUser(body);
      return user;
    } catch (error) {
      const err = error as Error;
      throw new InternalServerErrorException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (error) {
      const err = error as Error;
      if (err.message === 'User not found') {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException(err.message);
    }
  }
}
