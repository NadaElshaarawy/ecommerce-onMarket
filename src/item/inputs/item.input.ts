import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class ItemInput {
  @IsNotEmpty()
  @IsUUID('4')
  @Field()
  itemId: string;
}
