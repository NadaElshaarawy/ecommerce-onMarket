import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatusEnum } from '../order.type';

@InputType()
export class OrdersFilter {
  @IsOptional()
  @Field(type => OrderStatusEnum, { nullable: true })
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;
}
