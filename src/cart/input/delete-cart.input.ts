import { Field, ID, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class DeleteCartItemInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  cartItemId: string;
}
