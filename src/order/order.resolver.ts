import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { HasPermission } from 'src/Auth/auth.metadata';
import { OrderPermissionsEnum } from 'src/security-group/security-group-permissions';
import { OrderInput } from './inputs/order.input';
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
  async cancelOrder(@Args() input: OrderInput) {
    return await this.orderService.cancelOrder(input.orderId);
  }

  @UseGuards(AuthGuard)
  @HasPermission(OrderPermissionsEnum.UPDATE_ORDERS)
  @Mutation(returns => gqlOrderResponse)
  async markOrderAsCompletedBoard(@Args() input: OrderInput) {
    return await this.orderService.markOrderAsCompletedBoard(input.orderId);
  }
  //** --------------------- QUERIES --------------------- */
}
