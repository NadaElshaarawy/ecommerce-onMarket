import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsUUID } from 'class-validator';
import { OrderStatusEnum } from '../order.type';

@InputType()
export class OrdersFilterBoard {
  @IsOptional()
  @IsUUID('4')
  @Field(type => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(type => OrderStatusEnum, { nullable: true })
  @IsEnum(OrderStatusEnum)
  status?: OrderStatusEnum;
}
