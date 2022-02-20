import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { OrderLine } from './models/order-line.model';
import { Item } from 'src/item/item.model';

@Injectable()
export class OrderDataloader {
  orderLinesLoader: DataLoader<string, OrderLine[]> = new DataLoader(
    async (ordersIds: string[]) => {
      const orderLines = await OrderLine.findAll({
        where: { id: ordersIds },
        include: [Item]
      });
      return ordersIds.map(orderId => orderLines.filter(orderLine => orderLine.id === orderId));
    }
  );
}
