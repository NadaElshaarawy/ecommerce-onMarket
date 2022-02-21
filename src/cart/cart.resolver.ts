import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/Auth/auth.guard';
import { Item } from 'src/item/item.model';
import { GqlBooleanResponse } from 'src/_common/graphql/graphql-response';
import { PaginatorInput } from 'src/_common/paginator/paginator.input';
import { CartItemDataloader } from './cart.dataloader';
import { CartItem } from './cart.model';
import { gqlCartItemResponse, gqlCartItemsPaginationResponse } from './cart.response';
import { CartItemService } from './cart.service';
import { AddToCartInput } from './input/add-to-cart.input';
import { DeleteCartItemInput } from './input/delete-cart.input';
import { UpdateCartItemInput } from './input/update-cart.input';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly cartItemDataloader: CartItemDataloader
  ) {}

  //** --------------------- MUTATIONS --------------------- */

  @UseGuards(AuthGuard)
  @Mutation(returns => gqlCartItemResponse)
  async addToCart(@Args('input') input: AddToCartInput) {
    return await this.cartItemService.addToCart(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => gqlCartItemResponse)
  async updateCartItem(@Args('input') input: UpdateCartItemInput) {
    return await this.cartItemService.updateCartItem(input);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => GqlBooleanResponse)
  async deleteCartItem(@Args() input: DeleteCartItemInput) {
    return await this.cartItemService.deleteCartItem(input.cartItemId);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => GqlBooleanResponse)
  async clearCart() {
    return await this.cartItemService.clearCart();
  }
  //** --------------------- QUERIES --------------------- */

  @UseGuards(AuthGuard)
  @Query(returns => gqlCartItemsPaginationResponse)
  async getCartItems(@Args('paginate') paginate: PaginatorInput) {
    return await this.cartItemService.getCartItems(paginate);
  }

  //** ------------------- DATALOADER ------------------- */
  @ResolveField(type => Item, { nullable: true })
  item(cartItem: CartItem) {
    console.log('test heroku auto deploy');

    return this.cartItemDataloader.itemLoader.load(cartItem.itemId);
  }
}
