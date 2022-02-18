import { Resolver } from '@nestjs/graphql';
import { Item } from './item.model';

@Resolver(() => Item)
export class ItemResolver {
  constructor() {}
}
