import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async addUser(data: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(data as any);
      return user;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Failed to retrieve user');
    }
  }
}
