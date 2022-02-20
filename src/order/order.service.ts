import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { CartItem } from 'src/cart/cart.model';
import { Item } from 'src/item/item.model';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';
import { Sequelize } from 'sequelize';
import { Order } from './models/order.model';
import { OrderLine } from './models/order-line.model';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { OrderStatusEnum } from './order.type';
import { PaginatorInput } from 'src/_common/paginator/paginator.input';
import { OrdersFilter } from './inputs/order-filter.input';
import { PaginationRes } from 'src/_common/paginator/paginator.types';
import { OrdersFilterBoard } from './inputs/order-filter-board.input';

@Injectable()
export class OrderService {
  constructor(
    @Inject(CONTEXT) private readonly context: GqlContext,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  private calculateTotalAmountForOrder(cartItems: CartItem[]) {
    let totalAmount = 0;
    for (let cartItem of cartItems) {
      totalAmount += cartItem.quantity * cartItem.item.price;
    }
    return totalAmount;
  }

  async submitOrder(): Promise<Order> {
    const { currentUser } = this.context;
    const cartItems = await CartItem.findAll({
      where: { userId: currentUser.id },
      include: [Item]
    });
    let totalAmount = this.calculateTotalAmountForOrder(cartItems);
    return await this.sequelize.transaction(async transaction => {
      const order = await Order.create({ userId: currentUser.id, totalAmount }, { transaction });
      for (let cartItem of cartItems) {
        await OrderLine.create(
          {
            orderId: order.id,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            price: cartItem.item.price
          },
          { transaction }
        );
      }
      await CartItem.destroy({ where: { userId: currentUser.id }, transaction });
      return order;
    });
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const { currentUser } = this.context;
    const order = await this.orderOrError(orderId);

    if (order.userId !== currentUser.id)
      throw new BaseHttpException(ErrorCodeEnum.ORDER_NOT_BELONGS_TO_USER);

    if (order.orderStatus !== OrderStatusEnum.NEW)
      throw new BaseHttpException(ErrorCodeEnum.ORDER_INCORRECT_STATUS);

    return await order.update({ orderStatus: OrderStatusEnum.CANCELED });
  }

  async orderOrError(orderId: string): Promise<Order> {
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) throw new BaseHttpException(ErrorCodeEnum.ORDER_NOT_EXIST);
    return order;
  }

  async markOrderAsCompletedBoard(orderId: string): Promise<Order> {
    const order = await this.orderOrError(orderId);
    return await order.update({ orderStatus: OrderStatusEnum.COMPLETED });
  }

  async myOrders(
    paginate: PaginatorInput = {},
    filter: OrdersFilter = {}
  ): Promise<PaginationRes<Order>> {
    const { currentUser } = this.context;
    return await Order.paginate(
      {
        userId: currentUser.id,
        ...(filter.status && { orderStatus: filter.status })
      },
      '-createdAt',
      paginate.page,
      paginate.limit
    );
  }

  async ordersBoard(
    paginate: PaginatorInput = {},
    filter: OrdersFilterBoard = {}
  ): Promise<PaginationRes<Order>> {
    return await Order.paginate(
      {
        ...(filter.status && { orderStatus: filter.status }),
        ...(filter.userId && { orderStatus: filter.status })
      },
      '-createdAt',
      paginate.page,
      paginate.limit
    );
  }
}
