import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const insert = await this.itemRepository.insert(createItemDto);
    const { id } = insert.identifiers[0];

    return this.findOne(id);
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // ToDo: add try catch possibly to all services
    await this.itemRepository.update(
      {
        id,
      },
      updateItemDto,
    );

    return this.findOne(id);
  }

  remove(id: number) {
    return this.itemRepository.delete({
      id,
    });
  }
}
