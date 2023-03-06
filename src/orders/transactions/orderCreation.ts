import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TransactionInputDto } from '../dto/transaction-input.dto';
import { Order } from '../entities/order.entity';
import { OrderTransaction } from './order';

type OrderCreationInput = Required<Omit<TransactionInputDto, 'order'>>;

@Injectable()
export class OrderCreationTransaction extends OrderTransaction<OrderCreationInput> {
  protected async execute(
    data: OrderCreationInput,
    manager: EntityManager,
  ): Promise<Order> {
    const { user, orderItems } = data;
    const order: Order = manager.create(Order, {
      user,
    });

    await manager.save(order);
    await manager.save(await this.fillItems(order, orderItems));

    return order;
  }
}
