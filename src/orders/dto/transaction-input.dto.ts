import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from './create-order.dto';

export class TransactionInputDto extends CreateOrderDto {
  user?: User;
  order?: Order;
}
