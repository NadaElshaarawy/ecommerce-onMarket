import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { HasPermission } from 'src/Auth/auth.metadata';
import { OrderPermissionsEnum } from 'src/security-group/security-group-permissions';
import { PaginatorInput } from 'src/_common/paginator/paginator.input';
import { OrdersFilterBoard } from './inputs/order-filter-board.input';
import { OrdersFilter } from './inputs/order-filter.input';
import { OrderInput } from './inputs/order.input';
import { Order } from './models/order.model';
import { gqlOrderResponse, gqlOrdersPaginationResponse } from './order.response';
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
  @UseGuards(AuthGuard)
  @Query(returns => gqlOrdersPaginationResponse)
  async myOrders(@Args('paginate') paginate: PaginatorInput, @Args('filter') filter: OrdersFilter) {
    return await this.orderService.myOrders(paginate, filter);
  }

  @UseGuards(AuthGuard)
  @HasPermission(OrderPermissionsEnum.READ_ORDERS)
  @Query(returns => gqlOrdersPaginationResponse)
  async ordersBoard(
    @Args('paginate') paginate: PaginatorInput,
    @Args('filter') filter: OrdersFilterBoard
  ) {
    return await this.orderService.ordersBoard(paginate, filter);
  }

  @UseGuards(AuthGuard)
  @Query(returns => gqlOrderResponse)
  async myOrder(@Args() input: OrderInput) {
    return await this.orderService.myOrder(input.orderId);
  }
}
