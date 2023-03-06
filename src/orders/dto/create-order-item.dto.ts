import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  itemId: number;

  @IsPositive()
  @IsNumber()
  itemAmount: number;
}
