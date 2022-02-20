import { Resolver } from '@nestjs/graphql';
import { CartItem } from './cart.model';
import { CartItemService } from './cart.service';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(private readonly cartItemService: CartItemService) {}

  //** --------------------- MUTATIONS --------------------- */

  //** --------------------- QUERIES --------------------- */
}
