import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ItemsService } from 'src/items/items.service';
import { Item } from 'src/items/entities/item.entity';
import { OrderCreationTransaction } from './transactions/orderCreation';
import { OrderUpdateTransaction } from './transactions/orderUpdate';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Item])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    UsersService,
    ItemsService,
    OrderCreationTransaction,
    OrderUpdateTransaction,
  ],
})
export class OrdersModule {}
