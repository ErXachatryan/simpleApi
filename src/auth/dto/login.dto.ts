import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export class LoginDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}
