import { EntityManager } from 'typeorm';
import { TransactionInputDto } from '../dto/transaction-input.dto';
import { Order } from '../entities/order.entity';
import { OrderTransaction } from './order';

type OrderUpdateInput = Required<Omit<TransactionInputDto, 'user'>>;

export class OrderUpdateTransaction extends OrderTransaction<OrderUpdateInput> {
  protected async execute(
    data: OrderUpdateInput,
    manager: EntityManager,
  ): Promise<Order> {
    const { order, orderItems } = data;

    await manager.remove(order.orderItems);
    await manager.save(order);
    await manager.save(await this.fillItems(order, orderItems));

    return order;
  }
}
