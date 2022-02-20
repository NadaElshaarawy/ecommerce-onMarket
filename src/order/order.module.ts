import { Module } from '@nestjs/common';
import { OrderDataloader } from './order.dataloader';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  providers: [OrderResolver, OrderService, OrderDataloader]
})
export class OrderModule {}
