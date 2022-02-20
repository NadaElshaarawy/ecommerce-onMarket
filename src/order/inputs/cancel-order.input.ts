import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class CancelOrderInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  orderId: string;
}
