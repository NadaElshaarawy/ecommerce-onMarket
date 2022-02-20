import { Module } from '@nestjs/common';
import { CartItemResolver } from './cart.resolver';
import { CartItemService } from './cart.service';

@Module({
  providers: [CartItemResolver, CartItemService]
})
export class CartItemModule {}
