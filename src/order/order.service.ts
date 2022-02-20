import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { CartItem } from 'src/cart/cart.model';
import { Item } from 'src/item/item.model';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';
import { Sequelize } from 'sequelize';
import { Order } from './models/order.model';
import { OrderLine } from './models/order-line.model';

@Injectable()
export class OrderService {
  constructor(
    @Inject(CONTEXT) private readonly context: GqlContext,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}
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

  private calculateTotalAmountForOrder(cartItems: CartItem[]) {
    let totalAmount = 0;
    for (let cartItem of cartItems) {
      totalAmount += cartItem.quantity * cartItem.item.price;
    }
    return totalAmount;
  }
}
