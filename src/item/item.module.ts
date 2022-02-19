import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';

@Module({
  imports: [],
  providers: [ItemResolver, ItemService],
  exports: []
})
export class ItemModule {}
