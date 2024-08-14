import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjs_user',
      password: 'nestjs_password',
      database: 'nestjs_db',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
