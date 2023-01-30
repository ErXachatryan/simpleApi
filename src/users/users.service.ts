import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.usersRepository.insert(createUserDto);

    return this.findOne(createUserDto.username);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(
      {
        username,
      },
      updateUserDto,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.findOne(
      updateUserDto.username || username,
    );

    return user;
  }

  async remove(username: string) {
    return this.usersRepository.delete({
      username,
    });
  }
}
