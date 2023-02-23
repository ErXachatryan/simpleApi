import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsPositive()
  @IsNumber()
  price: number;

  @IsNumber()
  amount: number;

  @IsString()
  measure: string;
}
