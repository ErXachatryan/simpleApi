import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/shared/enums/orderStatuses';
import { OrderEditDenied } from 'src/shared/errors/order/orderEditDenied';
import { OrderNotFoundError } from 'src/shared/errors/order/orderNotFound';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderCreationTransaction } from './transactions/orderCreation';
import { OrderUpdateTransaction } from './transactions/orderUpdate';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private usersService: UsersService,
    private orderCreationTransaction: OrderCreationTransaction,
    private orderUpdateTransaction: OrderUpdateTransaction,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const { orderItems } = createOrderDto;
    const user: User = await this.usersService.findOne({ id: userId });

    return await this.orderCreationTransaction.run({ user, orderItems });
  }

  async findAll() {
    const orders = await this.orderRepository.find();

    if (orders) return orders;

    throw new OrderNotFoundError();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderItems: true,
      },
    });

    if (order) return order;

    throw new OrderNotFoundError();
  }

  async update(order: Order, updateOrderDto: UpdateOrderDto) {
    // ToDo: doesn't really change the 'updated_on' of the order
    const { orderItems } = updateOrderDto;

    if (order.status !== OrderStatus.Pending) throw new OrderEditDenied();

    return await this.orderUpdateTransaction.run({ order, orderItems });
  }

  cancel(order: Order) {
    if (order.status !== OrderStatus.Pending) throw new OrderEditDenied();

    return this.orderRepository.update(order.id, {
      status: OrderStatus.Canceled,
    });
  }
}
