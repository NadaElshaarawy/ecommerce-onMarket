import { Module } from '@nestjs/common';
import { CartItemDataloader } from './cart.dataloader';
import { CartItemResolver } from './cart.resolver';
import { CartItemService } from './cart.service';

@Module({
  providers: [CartItemResolver, CartItemService, CartItemDataloader]
})
export class CartItemModule {}
