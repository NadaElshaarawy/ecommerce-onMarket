import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';

@Module({
  imports: [],
  providers: [ItemResolver],
  exports: []
})
export class ItemModule {}
