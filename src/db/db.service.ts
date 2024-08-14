import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectConnection } from '@nestjs/sequelize';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,  // Correct usage inside a class
  ) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Successfully connected to the database.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
