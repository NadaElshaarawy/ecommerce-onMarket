import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { Order } from './models/order.model';
import { gqlOrderResponse } from './order.response';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  //** --------------------- MUTATIONS --------------------- */
  @UseGuards(AuthGuard)
  @Mutation(returns => gqlOrderResponse)
  async submitOrder() {
    return await this.orderService.submitOrder();
  }
  //** --------------------- QUERIES --------------------- */
}
