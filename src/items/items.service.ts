import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemNotFoundError } from 'src/shared/errors/item/itemNotFound';
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

  async findAll() {
    const items = await this.itemRepository.find();

    if (items) return items;

    throw new ItemNotFoundError();
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOneBy({ id });

    if (item) return item;

    throw new ItemNotFoundError();
  }

  async update(item: Item, updateItemDto: UpdateItemDto) {
    // ToDo: add try catch possibly to all services
    await this.itemRepository.update(
      {
        id: item.id,
      },
      updateItemDto,
    );

    return item;
  }

  remove(item: Item) {
    return this.itemRepository.delete({
      id: item.id,
    });
  }
}
