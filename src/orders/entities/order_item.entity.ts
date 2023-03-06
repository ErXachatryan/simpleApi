import { Item } from 'src/items/entities/item.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemPrice: number;

  @Column()
  itemAmount: number;

  @Column({
    nullable: true,
  })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Item, (item) => item.orderItems, {
    onDelete: 'SET NULL',
  })
  item: Item;

  @BeforeInsert()
  setTotalPrice() {
    this.totalPrice = this.itemAmount * this.itemPrice;
  }
}
