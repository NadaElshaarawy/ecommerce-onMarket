import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';
import { PaginatorInput } from 'src/_common/paginator/paginator.input';
import { PaginationRes } from 'src/_common/paginator/paginator.types';
import { CartItem } from './cart.model';
import { AddToCartInput } from './input/add-to-cart.input';
import { UpdateCartItemInput } from './input/update-cart.input';

@Injectable()
export class CartItemService {
  constructor(@Inject(CONTEXT) private readonly context: GqlContext) {}

  async addToCart(input: AddToCartInput): Promise<CartItem> {
    const { currentUser } = this.context;
    return await CartItem.create({ ...input, userId: currentUser.id });
  }

  async getCartItems(paginate: PaginatorInput = {}): Promise<PaginationRes<CartItem>> {
    const { currentUser } = this.context;
    return await CartItem.paginate(
      { userId: currentUser.id },
      '-createdAt',
      paginate.page,
      paginate.limit
    );
  }

  async updateCartItem(input: UpdateCartItemInput): Promise<CartItem> {
    const { currentUser } = this.context;
    const cartItem = await this.cartItemOrError(input.cartItemId);
    if (cartItem.userId !== currentUser.id)
      throw new BaseHttpException(ErrorCodeEnum.CART_ITEM_NOT_BELONGS_TO_USER);
    return await cartItem.update(input);
  }

  async deleteCartItem(cartItemId: string): Promise<Boolean> {
    const { currentUser } = this.context;
    const cartItem = await this.cartItemOrError(cartItemId);
    if (cartItem.userId !== currentUser.id)
      throw new BaseHttpException(ErrorCodeEnum.CART_ITEM_NOT_BELONGS_TO_USER);
    await CartItem.destroy({ where: { id: cartItem.id } });
    return true;
  }

  async clearCart(): Promise<Boolean> {
    const { currentUser } = this.context;
    await CartItem.destroy({ where: { userId: currentUser.id } });
    return true;
  }

  async cartItemOrError(cartItemId: string) {
    const cartItem = await CartItem.findOne({ where: { id: cartItemId } });
    if (!cartItem) throw new BaseHttpException(ErrorCodeEnum.CART_ITEM_NOT_EXIST);
    return cartItem;
  }
}
