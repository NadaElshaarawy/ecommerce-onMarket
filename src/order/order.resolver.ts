import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { CancelOrderInput } from './inputs/cancel-order.input';
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

  @UseGuards(AuthGuard)
  @Mutation(returns => gqlOrderResponse)
  async cancelOrder(@Args() input: CancelOrderInput) {
    return await this.orderService.cancelOrder(input.orderId);
  }
  //** --------------------- QUERIES --------------------- */
}
