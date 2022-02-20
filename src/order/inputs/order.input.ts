import { Field, ID, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class OrderInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  orderId: string;
}
