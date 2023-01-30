import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'db',
        port: configService.get('MYSQL_PORT'),
        username: 'root',
        password: configService.get('MYSQL_ROOT_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: ['dist/**/*.entity{ .ts,.js}'],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [LocalStrategy],
})
export class AppModule {}
