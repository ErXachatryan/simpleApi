import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
