import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @Type(() => CreateOrderItemDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
