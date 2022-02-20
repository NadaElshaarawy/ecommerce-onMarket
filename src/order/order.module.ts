import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [],
  providers: [OrderResolver, OrderService],
  exports: []
})
export class OrderModule {}
