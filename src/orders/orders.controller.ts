import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Order } from './entities/order.entity';
import { ServiceExceptionFilter } from 'src/shared/filters/serviceExceptionFilter';

@UseFilters(ServiceExceptionFilter)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Req() { user }, @Body() createOrderDto: CreateOrderDto) {
    const { id } = await this.ordersService.create(user.id, createOrderDto);

    return this.ordersService.findOne(id);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order: Order = await this.ordersService.findOne(id);
    const { id: orderId } = await this.ordersService.update(
      order,
      updateOrderDto,
    );

    return this.ordersService.findOne(orderId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const order: Order = await this.ordersService.findOne(id);

    return this.ordersService.cancel(order);
  }
}
