import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { BaseTransaction } from 'src/shared/transactions/baseTransaction';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { TransactionInputDto } from '../dto/transaction-input.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order_item.entity';

export abstract class OrderTransaction<
  Input extends TransactionInputDto,
> extends BaseTransaction<TransactionInputDto, Order> {
  constructor(
    datasource: DataSource,
    private readonly itemsService: ItemsService,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {
    super(datasource);
  }

  protected abstract execute(
    data: Input,
    manager: EntityManager,
  ): Promise<Order>;

  protected fillItems(
    order: Order,
    orderItems: CreateOrderItemDto[],
  ): Promise<OrderItem[]> {
    return Promise.all(
      orderItems.map(async (it) => {
        const item = await this.itemsService.findOne(it.itemId);

        return this.orderItemRepository.create({
          order,
          item,
          itemPrice: item.price,
          itemAmount: it.itemAmount,
        });
      }),
    );
  }
}
