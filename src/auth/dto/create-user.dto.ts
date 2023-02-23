import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enums/roles';

export class CreateUserDto {
  // ToDo: make a real use of this "introspectComments": true
  @IsString()
  name: string;

  @IsString()
  surName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsEnum(Role)
  role: Role;
}
