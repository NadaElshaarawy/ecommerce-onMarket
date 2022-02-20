import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Item } from 'src/item/item.model';

@Injectable()
export class CartItemDataloader {
  itemLoader: DataLoader<string, Item> = new DataLoader(async (itemsIds: string[]) => {
    const items = await Item.findAll({
      where: { id: itemsIds }
    });
    return itemsIds.map(itemId => items.find(item => item.id === itemId));
  });
}
