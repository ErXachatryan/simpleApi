import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const insert = await this.userRepository.insert(createUserDto);
    const { id } = insert.identifiers[0];

    return this.findOne(id);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(props: { id: number } | { username: string }): Promise<User> {
    // ToDo: parameter list beautify
    return this.userRepository.findOneBy({ ...props });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(
      {
        id,
      },
      updateUserDto,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.findOne({ id });

    return user;
  }

  async remove(id: number) {
    return this.userRepository.delete({
      id,
    });
  }
}
