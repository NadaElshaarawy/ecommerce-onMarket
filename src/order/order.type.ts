import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatusEnum {
  NEW = 'NEW',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}
registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });
